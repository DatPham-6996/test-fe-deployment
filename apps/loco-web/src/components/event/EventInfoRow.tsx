import { setPreviousPage } from '@/lib/utils/previous-page';
import { formatTime, toVnShortDateFormat } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { CalendarDaysIcon, ClockIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../card';

type EventInfoProps = {
  handle: string;
  image: string;
  title: string;
  start: string;
  end: string;
  address?: string;
  className?: string;
  disableLink?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export default function EventInfoRow({
  handle,
  image,
  title,
  start,
  end,
  address,
  className,
  disableLink = true,
  size = 'small',
}: EventInfoProps) {
  const { locale } = useLocale();
  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);
  const imgSize =
    size === 'small' ? 'w-[66px] h-[66px]' : size === 'medium' ? 'w-[80px] h-[80px]' : 'w-[96px] h-[96px]';
  const img = image && (
    <div className={`flex ${imgSize} flex-1.25 relative`}>
      <Image alt={'Event Image'} fill className={`rounded-md object-cover ${imgSize}`} src={image} />
    </div>
  );

  const textTitleSize = size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg';
  const textSize = size === 'small' ? 'text-tiny' : size === 'medium' ? 'text-xs' : 'text-sm';
  const iconSize = size === 'small' ? 'h-3 w-3' : size === 'medium' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <Card className={`${className}`}>
      <div className="flex gap-3 px-4">
        {disableLink ? (
          img
        ) : (
          <Link href={`/events/${handle}`} onClick={() => setPreviousPage(window.location.href)}>
            {img}
          </Link>
        )}

        <div className="flex flex-col gap-1.5 flex-[4]">
          <p className={`font-medium ${textTitleSize}`}>{title}</p>

          <div className="flex gap-4">
            {start && (
              <div className="flex items-center justify-center gap-1">
                <CalendarDaysIcon className={` ${iconSize}`} />
                <p className={`${textSize}`}>{toVnShortDateFormat(startDate, false, locale)}</p>
              </div>
            )}

            {start && end && (
              <div className="flex items-center justify-center gap-1">
                <ClockIcon className={` ${iconSize}`} />
                <p className={`${textSize}`}>
                  {formatTime(startDate, locale)} - {formatTime(endDate, locale)}
                </p>
              </div>
            )}
          </div>
          {address && <p className={`text-muted-foreground ${textSize}`}>{address}</p>}
        </div>
      </div>
    </Card>
  );
}
