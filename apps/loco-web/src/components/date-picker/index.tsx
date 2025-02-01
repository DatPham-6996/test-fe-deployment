import { useLocale } from '@/locale/intl-provider-wrapper';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Button } from '@/components/shadcn/ui/button';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { cn } from '@/lib/utils';
import { enUS, vi } from 'date-fns/locale';
import { isMobile } from 'react-device-detect';

export type DateRangePickerProps = {
  selectedDateRange?: DateRange;
  setSelectedDateRange: (date: DateRange | undefined) => void;
  className?: string;
  buttonClassName?: string;
  fromDate?: Date;
  toDate?: Date;
  label?: string;
};

export default function DateRangePicker({
  selectedDateRange,
  setSelectedDateRange,
  className,
  buttonClassName,
  fromDate,
  toDate,
  label,
}: DateRangePickerProps) {
  const { locale } = useLocale();
  const dateLocale = locale === 'vi' ? vi : enUS;
  const { formatMessage } = useIntl();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(selectedDateRange);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect: SelectRangeEventHandler = (nextRange, selectedDay) => {
    setDateRange((range) => {
      if (range?.from && range?.to) return { from: selectedDay };
      return nextRange as DateRange;
    });
  };

  const CalendarContent = () => {
    return (
      <>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          fromDate={fromDate}
          toDate={toDate}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={isMobile ? 1 : 2}
          locale={dateLocale}
        />
      </>
    );
  };

  const Actions = () => {
    return (
      <div className="flex flex-row items-center sm:items-end">
        <Button
          disabled={!dateRange || !dateRange.from || !dateRange.to}
          onClick={() => {
            setSelectedDateRange(undefined);
            setDateRange(undefined);
            setIsOpen(false);
          }}
          className="mb-4 mr-2 ml-4 grow min-w-28 h-12 sm:flex-auto"
          variant="ghost"
        >
          {formatMessage({ id: 'common.delete' })}
        </Button>
        <Button
          disabled={!dateRange || !dateRange.from || !dateRange.to}
          onClick={() => {
            if (!dateRange || !dateRange.from || !dateRange.to) {
              throw new Error('Date range is required');
            }
            setSelectedDateRange(dateRange);
            setDateRange(dateRange);
            setIsOpen(false);
          }}
          className="mb-4 mr-4 grow min-w-28 h-12 sm:flex-auto"
        >
          {formatMessage({ id: 'payout.confirm' })}
        </Button>
      </div>
    );
  };

  const SelectedDateRangeLabel = () => {
    if (selectedDateRange?.from && selectedDateRange?.to) {
      console.log(selectedDateRange?.from, selectedDateRange?.to);
      if (selectedDateRange?.from?.getTime() === selectedDateRange?.to?.getTime()) {
        return format(selectedDateRange?.from, 'dd/MM/yyyy', { locale: dateLocale });
      }
      return (
        <>
          {format(selectedDateRange?.from, 'dd/MM/yyyy', { locale: dateLocale })} -{' '}
          {format(selectedDateRange?.to, 'dd/MM/yyyy', { locale: dateLocale })}
        </>
      );
    }

    return label || formatMessage({ id: 'payout.pickADate' });
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'ghost'}
            className={cn('w-auto justify-start border border-black dark:border-muted-foreground rounded-md px-4 py-2', buttonClassName)}
          >
            <CalendarIcon size={18} className="mr-2 h-4 w-4" />
            <div className="text-sm font-medium">
              <SelectedDateRangeLabel />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 items-end justify-items-end" align="start">
          <CalendarContent />
          <Actions />
        </PopoverContent>
      </Popover>
    </div>
  );
}
