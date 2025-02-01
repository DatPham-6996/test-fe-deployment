import { stringToLuxonVN } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { Separator } from './shadcn/ui/separator';
export function Calendar({ date }: { date: string }) {
  const { locale } = useLocale();
  const convertedDate = stringToLuxonVN(date, locale);
  return (
    <div className="flex flex-col items-center justify-center border border-neutral-200 overflow-hidden rounded-xl w-12 h-12">
      <div className="flex justify-center items-center pt-0.5">
        <p className="text-sm font-medium">{convertedDate.day}</p>
      </div>
      <Separator />
      <div className="flex justify-center items-end pb-1 bg-neutral-100 dark:bg-black h-full w-full">
        <p className="text-tiny font-medium">{convertedDate.monthShort}</p>
      </div>
    </div>
  );
}
