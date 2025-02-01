import { FlipEvent } from '@/lib/__generated__/graphql';
import { MediaCollection } from '@/lib/types';
import { formatTime, stringToLuxonVN, toVnShortDateFormat } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import classNames from 'classnames';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

export type EventCardCarouselProps = {
  event: FlipEvent;
  index?: string | number;
  xsMaxWidth?: boolean;
  showEventStatus?: boolean;
  onClick?: () => void;
};

export default function EventCardCarousel({
  event,
  index,
  xsMaxWidth,
  showEventStatus,
  onClick,
}: EventCardCarouselProps) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();
  const router = useRouter();

  if (!event) return;

  const startAt = stringToLuxonVN(event.startAt, locale);
  const endAt = stringToLuxonVN(event.endAt, locale);
  const isMultipleDay = (event.isMultipleDay && event.isParentEvent) ?? false;
  const eventTime = formatTime(startAt, locale);
  const mediaCollection = event.mediaCollection as MediaCollection;

  const getCoverPhoto = () => {
    if (event.media && event.media.length) {
      if (mediaCollection && mediaCollection.cover) {
        return event.media.find((item: any) => mediaCollection.cover === item.id);
      } else {
        return event.media[0];
      }
    }
    return null;
  };

  const orgName = event.organization?.name || '';
  const orgLogo = event.organization?.logoURL || '';
  const coverImg = getCoverPhoto();
  const coverImgUrl = coverImg ? coverImg.url : '/assets/images/default.png';
  const isOnSale = event.isOnSale ?? false;

  return (
    <div
      className={classNames('cursor-pointer group block', xsMaxWidth && 'max-w-[280px]')}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          router.push(`/events/${event.handle}`);
        }
      }}
    >
      <div className="relative rounded-lg p-1.5 transition-colors group-hover:bg-white dark:group-hover:bg-neutral-800">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={coverImgUrl}
            alt={event.name}
            className="aspect-[5/3] h-full w-full max-h-full max-w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            width={1000}
            height={1000}
          />
        </div>
        <div className="py-2 flex flex-col">
          {isMultipleDay ? (
            <p className="font-light text-sm line-clamp-1">{formatMessage({ id: 'organizer.event.multipleDay' })}</p>
          ) : (
            <div className="flex flex-row items-center">
              <p className="font-light text-sm line-clamp-1">{toVnShortDateFormat(startAt, false, locale)}</p>
              <Dot />
              <p className="font-light text-sm line-clamp-1">{eventTime}</p>
            </div>
          )}

          <p className="font-medium text-lg line-clamp-2">{event.name}</p>

          {event.venue?.name && (
            <p className="font-light text-sm line-clamp-1">
              {event.venue?.name || formatMessage({ id: 'me.tickets.noLocation' })}
            </p>
          )}

          {orgName.length > 0 && (
            <div className="flex items-center gap-2">
              <Image src={orgLogo} alt={orgName} width={16} height={16} className="rounded-full" />
              <p className="font-light text-xs line-clamp-1">{orgName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
