import { FlipEvent, FlipExternalEvent } from '@/lib/__generated__/graphql';
import { MediaCollection } from '@/lib/types';
import { cn } from '@/lib/utils';
import { setPreviousPage } from '@/lib/utils/previous-page';
import { formatDate, formatTime, getDayName, stringToLuxonVN } from '@/lib/utils/time-format';
import { toastSuccess } from '@/lib/utils/toast';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { Dot, ExternalLinkIcon, MapPinIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { isDesktop } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { Card } from '../card';
import { Badge } from '../shadcn/ui/badge';
import { Button } from '../shadcn/ui/button';
;

export type EventCardProps = {
  event: FlipEvent | FlipExternalEvent;
  index: string | number;
  isOnClickToEvent?: boolean;
  onTicketClick?: (tickets: string[]) => void;
  onClick?: () => void;
  showEventStatus?: boolean;
};

export default function EventCard({
  event,
  index,
  onTicketClick,
  isOnClickToEvent = true,
  onClick,
  showEventStatus,
}: EventCardProps) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();
  const router = useRouter();

  if (!event) return;
  const isFlipEvent = event.__typename === 'FlipEvent';
  const isFlipExternalEvent = event.__typename === 'FlipExternalEvent';
  const startAt = stringToLuxonVN(event.startAt, locale);
  const endAt = stringToLuxonVN(event.endAt, locale);
  const eventTime = `${formatTime(startAt, locale)} - ${formatTime(endAt, locale)}`;
  const mediaCollection = isFlipEvent && (event.mediaCollection as MediaCollection);

  const getCoverPhoto = (): string | null => {
    if (isFlipEvent) {
      if (event.media && event.media.length) {
        if (mediaCollection && mediaCollection.cover) {
          const coverItem = event.media.find((item: any) => mediaCollection.cover === item.id);
          return coverItem?.url ?? null;
        } else {
          return event.media[0].url;
        }
      }
    } else if (isFlipExternalEvent && event.mediaURLs) {
      return event.mediaURLs.length > 0 ? event.mediaURLs[0] : null;
    }
    return null;
  };

  const tickets = (isFlipEvent && event.tickets?.map((ticket: any) => ticket.id)) || [];
  const hasTicket = isFlipEvent && tickets.length > 0;

  const orgName = event.organization?.name || isFlipExternalEvent && event.organizationName || '';
  const orgLogo = event.organization?.logoURL;

  const coverImg = getCoverPhoto();
  const coverImgUrl = coverImg ?? '/assets/images/default.png';

  const isOnSale = event.isOnSale ?? false;
  const isUpcoming = isFlipEvent && event.onsale ? new Date(event.onsale) > new Date() : false;

  const onEventClickHandler = async () => {
    if (onClick) {
      onClick();
      return;
    } else {
      setPreviousPage(window.location.href);

      if (isFlipEvent) router.push(`/events/${event.handle}`);
      else if (isFlipExternalEvent) {
        await navigator.clipboard.writeText(event.ticketUrl);
        toastSuccess(formatMessage({ id: 'artist.copyTicketLink' }));
      }
    }
  };

  const onTicketClickHandler = () => {
    if (onTicketClick) {
      onTicketClick(tickets);
    }
  };

  const ButtonRow = ((hasTicket && onTicketClick) || !isOnClickToEvent) && (
    <div className="flex flex-row gap-2">
      {hasTicket && onTicketClick && (
        <Button
          onClick={onTicketClickHandler}
          size={'sm'}
          type="button"
          className="hover:!bg-slate-200 hover:!text-black w-[150px]"
        >
          {formatMessage({ id: 'me.tickets.viewTicket' })}
        </Button>
      )}
      {!isOnClickToEvent && (
        <Button
          onClick={onEventClickHandler}
          size={'sm'}
          type="button"
          variant={'secondary'}
          className="hover:!bg-slate-200 hover:!text-black w-[150px]"
        >
          {formatMessage({ id: 'me.tickets.eventDetail' })}
        </Button>
      )}
    </div>
  );

  const TimeLineDesktop = (
    <div className="flex flex-col justify-start border-r-2 border-neutral-300 border-dashed relative">
      <div className="hidden md:flex md:flex-col w-[100px] md:mt-2 md:mr-2">
        <p className="font-normal">{formatDate(startAt, locale)}</p>
        <p className="text-muted-foreground">{getDayName(startAt, locale)}</p>
      </div>

      <div className="bg-muted-foreground w-2.5 h-2.5 border-2 border-neutral-400 rounded-full absolute top-6 -right-1.5" />
    </div>
  );

  const DateMobile = (
    <div className="flex gap-2 ml-1">
      <p className="md:!hidden font-medium">{formatDate(startAt, locale)}</p>
      <p className="text-muted-foreground md:!hidden font-medium">{getDayName(startAt, locale)}</p>
    </div>
  );

  return (
    <div key={index} className="flex flex-row gap-4 w-full">
      {isDesktop && TimeLineDesktop}

      {/* Event Card */}
      <div className="mt-4 flex flex-col gap-1.5 w-full max-w-[650px]">
        {DateMobile}
        <Card
          className={cn(
            'bg-secondary pl-2 md:pl-3 pr-2 pt-3 pb-2',
            isOnClickToEvent ? 'cursor-pointer hover:shadow-lg dark:hover:border-white ' : '',
            'flex flex-col gap-2'
          )}
        >
          <div
            className="flex flex-row gap-1 justify-between"
            onClick={() => {
              if (!isOnClickToEvent) return;
              onEventClickHandler();
            }}
          >
            {/* Left Content */}
            <div className="flex flex-col flex-1 gap-1.5 md:min-w-[400px] max-w-[calc(90%-90px)]">
              <div className="flex items-center">
                {showEventStatus && !isOnSale && isUpcoming ? (
                  <div className="flex items-center justify-center">
                    <Badge variant={'default'} className="text-xs font-normal rounded-sm">
                      {formatMessage({ id: 'eventDetail.upcoming' })}
                    </Badge>
                    <Dot />
                  </div>
                ) : (
                  showEventStatus &&
                  !isOnSale && (
                    <div className="flex items-center justify-center">
                      <Badge variant={'outline'} className="text-xs font-normal rounded-sm border-2 dark:border-white">
                        {formatMessage({ id: 'eventDetail.offsale' })}
                      </Badge>
                      <Dot />
                    </div>
                  )
                )}

                <p className="text-muted-foreground text-sm font-medium">{eventTime}</p>

                {hasTicket && (
                  <div className="flex items-center justify-center">
                    <Dot />
                    <p className="text-xs">
                      {event.tickets?.length} {formatMessage({ id: 'ticket.ticket' })}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-row gap-2 items-baseline">
                <p className="text-xl font-medium">{event.name}</p>
                {isFlipExternalEvent && <ExternalLinkIcon size={16} />}
              </div>

              {orgName.length > 0 && (
                <div className="flex gap-2 items-center">
                  {orgLogo && <Image alt={orgName} src={orgLogo} width={20} height={20} className="rounded-full" />}
                  <p className="text-muted-foreground truncate text-sm font-normal">{orgName}</p>
                </div>
              )}

              {event.venue?.name && (
                <div className="flex gap-2 items-center">
                  <MapPinIcon className="stroke-neutral-400 min-w-5 stroke-1" size={20} />
                  <p className="text-muted-foreground text-sm line-clamp-2 font-normal">
                    {event.venue?.name || formatMessage({ id: 'me.tickets.noLocation' })}
                    {event.address?.city ? ' - ' + event.address?.city : ''}
                  </p>
                </div>
              )}

              {!event.venue?.name && event.address?.address && (
                <div className="flex gap-2 items-center">
                  <MapPinIcon className="stroke-neutral-400 min-w-5 stroke-1" size={20} />
                  <p className="text-muted-foreground text-sm line-clamp-2 font-normal">
                    {event.address?.address || formatMessage({ id: 'me.tickets.noLocation' })}
                  </p>
                </div>
              )}
            </div>

            {/* Right Image */}
            <div className="group/image flex overflow-hidden rounded-md !w-[100px] !h-[100px] md:!w-[130px] md:!h-[130px]">
              <Image
                className="rounded-md object-cover !aspect-square transition-transform duration-300 ease-out group-hover/image:scale-110"
                width={130}
                height={130}
                alt="a"
                src={coverImgUrl}
              />
            </div>
          </div>
          {ButtonRow}
        </Card>
      </div>
    </div>
  );
}
