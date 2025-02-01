import { FlipEvent } from '@/lib/__generated__/graphql';
import { setPreviousPage } from '@/lib/utils/previous-page';
import { toVnShortDateFormat } from '@/lib/utils/time-format';
import { CalendarDaysIcon, TimerIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../shadcn/ui/card';

export type EventInfoCardProps = {
  event: FlipEvent;
};
export function EventInfoCard({ event }: EventInfoCardProps) {
  const getCoverPhoto = () => {
    if (event?.mediaCollection?.cover && event?.media && event?.media?.length) {
      return event.media.find((item: { id: string }) => event.mediaCollection.cover === item.id);
    }
    return null;
  };
  const coverPhoto = getCoverPhoto();
  const eventName = event?.name || '';
  const address = event?.address?.address || '';
  const startDate = event?.startAt ? DateTime.fromISO(event.startAt) : '';
  const endDate = event?.endAt ? DateTime.fromISO(event.endAt) : '';

  const startDateHourMin = startDate ? startDate.toFormat('HH:mm') : null;
  const endDateHourMin = endDate ? endDate.toFormat('HH:mm') : null;
  return (
    <Card>
      <div className="flex flex-col gap-3 p-2 ">
        {coverPhoto && (
          <Image
            className="rounded-md h-full w-full object-cover"
            width={300}
            height={162}
            src={coverPhoto.url}
            alt={eventName}
          />
        )}
        <div className="flex flex-col px-2 pb-2">
          <Link href={`/events/${event?.handle}`} onClick={() => setPreviousPage(window.location.href)}>
            <p className="font-semibold text-lg">{eventName}</p>
          </Link>

          <div className="flex justify-between">
            {startDate && (
              <div className="flex items-center justify-center gap-1.5">
                <CalendarDaysIcon size={16} />
                <p>{toVnShortDateFormat(startDate)}</p>
              </div>
            )}

            {startDateHourMin && endDateHourMin && (
              <div className="flex items-center justify-center gap-1.5">
                <TimerIcon size={16} />
                <p>
                  {startDateHourMin} - {endDateHourMin}
                </p>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm">{address}</p>
        </div>
      </div>
    </Card>
  );
}
