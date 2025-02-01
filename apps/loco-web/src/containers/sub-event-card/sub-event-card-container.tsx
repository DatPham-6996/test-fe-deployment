'use client';

import { Card, CardBody, CardHeader } from '@/components/card';
import { Button } from '@/components/shadcn/ui/button';
import { Card as CardCN } from '@/components/shadcn/ui/card';
import { Separator } from '@/components/shadcn/ui/separator';
import { EventStatus, useEventOccurrencesQuery } from '@/lib/__generated__/graphql';
import { cn } from '@/lib/utils';
import { formatDate, formatTime, getDayName, stringToLuxonVN } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { Calendar, CalendarDays, ChevronDown, TimerIcon } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import { isDesktop } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';

type Props = {
  parentEventId: string;
  defaultVenueName?: string;
};

export function SubEventCardContainer({ parentEventId, defaultVenueName }: Props) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();

  const fromDate = useMemo(() => new Date(), []);

  const { data, fetchMore } = useEventOccurrencesQuery({
    variables: {
      input: {
        eventId: parentEventId,
        take: 5,
        fromDate,
        status: [EventStatus.Published],
      },
    },
  });
  const isEmpty = data?.eventOccurrences.results.length === 0;
  const hasNextPage = data?.eventOccurrences.pageInfo.hasNextPage;

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        input: {
          eventId: parentEventId,
          take: 5,
          fromDate,
          status: [EventStatus.Published],
          cursor: {
            id: data?.eventOccurrences.pageInfo.endCursor,
          },
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          eventOccurrences: {
            ...fetchMoreResult.eventOccurrences,
            results: [...prev.eventOccurrences.results, ...fetchMoreResult.eventOccurrences.results],
          },
        };
      },
    });
  };

  const renderPromoMessage = (
    <div className="flex items-center rounded-lg p-2 gap-3">
      <div className="flex justify-center items-center rounded-lg w-10 h-10 border border-neutral-200">
        <TimerIcon size={18} />
      </div>
      <div className="flex flex-col">
        <p>{formatMessage({ id: 'eventDetail.limitSeats' })}</p>
        <p className="text-muted-foreground text-sm">{formatMessage({ id: 'eventDetail.hurryNiceSeat' })}</p>
      </div>
    </div>
  );

  const renderSubEvents = (
    <div className="flex flex-col gap-1">
      {data?.eventOccurrences.results.map((occurrence) => {
        const startAt = stringToLuxonVN(occurrence.startAt, locale);
        const venueName = occurrence.venue?.name ?? defaultVenueName;
        const { handle, isOnSale, id, isSoldOut } = occurrence;
        const onClick = (e: React.MouseEvent) => {
          if (!isOnSale || isSoldOut) return;
          e.stopPropagation();
          window.open(`/reservation/${handle}`, '_blank');
        };

        return (
          <CardCN
            key={id}
            onClick={onClick}
            className={cn(
              'flex flex-row justify-between gap-1 rounded-lg px-3 py-4 shadow-none',
              isOnSale ? 'cursor-pointer hover:border-neutral-200 dark:hover:border-neutral-800' : '',
              'border border-transparent transition-colors duration-200'
            )}
          >
            <div className="flex flex-col min-w-[120px] ">
              <p className="font-medium">{formatDate(startAt, locale)}</p>
              <p className="text-muted-foreground font-light text-sm">
                {getDayName(startAt, locale)} • {formatTime(startAt, locale)}
              </p>
            </div>

            {venueName && isDesktop && (
              <div className="flex flex-col justify-start w-full ">
                <p className="font-medium">{venueName}</p>
              </div>
            )}


            <Button onClick={onClick} size={'sm'} disabled={!isOnSale || isSoldOut}>
              {isSoldOut ? formatMessage({ id: 'eventDetail.soldOut' }) : formatMessage({ id: 'eventDetail.bookTicket' })}
            </Button>
          </CardCN>
        );
      })}
    </div>
  );

  const renderEmptySchedule = (
    <div className="flex flex-col justify-center items-center py-7 gap-5">
      <Calendar size={100} strokeWidth={1} color="gray" />
      <div>
        <p className="text-xl">{formatMessage({ id: 'eventDetail.emptySchedule' })}</p>
      </div>
    </div>
  );

  const renderLoading = () => {
    return (
      <div className="flex flex-col justify-center items-center py-7 gap-5">
        <ClipLoader />
      </div>
    );
  };

  return (
    <Card>
      <CardHeader title={formatMessage({ id: 'eventDetail.schedule' })} icon={<CalendarDays size={18} />} />
      <Separator orientation="horizontal" />
      <Suspense fallback={renderLoading()}>
        <CardBody>
          {!isEmpty && (
            <>
              {renderSubEvents}
              {hasNextPage && (
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    className="group flex items-center gap-2 hover:bg-neutral-100/90 dark:hover:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                  >
                    {formatMessage({ id: 'eventDetail.loadMore' })}
                    <ChevronDown size={24} />
                  </Button>
                </div>
              )}
            </>
          )}
          {isEmpty && renderEmptySchedule}
        </CardBody>
      </Suspense>
    </Card>
  );
}
