import { Button } from '@/components/shadcn/ui/button';
import { Calendar } from '@/components/shadcn/ui/calendar';
import { FormControl } from '@/components/shadcn/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { TimePicker } from '@/components/time-picker/time-picker';
import { formatTimeAndDate } from '@/lib/utils/time-format';
import classNames from 'classnames';
import { Locale } from 'date-fns';
import { DateTime } from 'luxon';
import { useIntl } from 'react-intl';

interface TimeSelectProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  locale: string;
  dateLocale: Locale;
}

export const TimeSelect = ({ value, onChange, locale, dateLocale }: TimeSelectProps) => {
  const { formatMessage } = useIntl();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={classNames(
              'w-full h-12 pl-3 text-left ring-transparent !font-normal border-none bg-secondary min-w-[200px]',
              !value && 'text-muted-foreground'
            )}
          >
            <span className="font-normal text-base">
              {value
                ? `${formatTimeAndDate(DateTime.fromJSDate(value), locale)}`
                : `${formatMessage({ id: 'promotion.discount.editor.pickDate' })}`}
            </span>
            <div className="w-full" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => (date ? onChange(date) : null)}
          disabled={(date) => date < new Date('1900-01-01')}
          locale={dateLocale}
          initialFocus
          className="border-b"
        />
        <div className="p-3 w-[250px]">
          <TimePicker setDate={(date: Date | undefined) => date && onChange(date)} date={value} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
