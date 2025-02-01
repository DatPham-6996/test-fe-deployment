'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn/ui/command';
import { useEventOccurrencesLazyQuery, FlipEvent, FlipMedia } from '@/lib/__generated__/graphql';
import { formatEventDateRange } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useIntl } from 'react-intl';
import Loader from '@/components/loading-indicator/Loader';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/shadcn/ui/button';
import DateRangePicker from '../date-picker';
import { DateRange } from 'react-day-picker';

export type SelectedParentEvent = Pick<FlipEvent, 'id' | 'name' | 'media'>;
export type SelectedEvent = Pick<
  FlipEvent,
  'id' | 'name' | 'media' | 'startAt' | 'endAt' | 'isMultipleDay' | 'isParentEvent'
>;

export default function EventOccurrencesSelector(props: {
  selectedParentEvent: SelectedParentEvent;
  handleSelectEvent: (event: SelectedEvent) => void;
  className?: string;
}) {
  const { selectedParentEvent, handleSelectEvent, className } = props;
  const { formatMessage } = useIntl();

  return (
    <Command className={className}>
      <p className="text-xl font-bold ml-4 mb-4 mt-3 sm:hidden">
        {formatMessage({ id: 'organizer.event.selectTime' })}
      </p>
      <Tabs defaultValue="upcoming" className={`mx-3 md:mt-3`}>
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="upcoming" className="h-10 font-semibold">
            {formatMessage({ id: 'eventDetail.upcoming' })}
          </TabsTrigger>
          <TabsTrigger value="past" className="h-10 font-semibold">
            {formatMessage({ id: 'eventDetail.past' })}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <EventOccurencesList
            type="upcoming"
            selectedParentEvent={selectedParentEvent}
            handleSelectEvent={handleSelectEvent}
          />
        </TabsContent>
        <TabsContent value="past">
          <EventOccurencesList
            type="past"
            selectedParentEvent={selectedParentEvent}
            handleSelectEvent={handleSelectEvent}
          />
        </TabsContent>
      </Tabs>
    </Command>
  );
}

function EventOccurencesList(props: {
  selectedParentEvent: SelectedParentEvent | null;
  type: 'upcoming' | 'past';
  handleSelectEvent: (event: SelectedEvent) => void;
}) {
  const { selectedParentEvent, handleSelectEvent, type } = props;
  const { formatMessage } = useIntl();
  const { locale } = useLocale();
  const [currentEvent] = useRecoilState(currentEventState);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();
  const [getEventOccurrences, { data, loading, fetchMore }] = useEventOccurrencesLazyQuery();
  const occurrences = data?.eventOccurrences?.results ?? [];
  const pagingData = data?.eventOccurrences?.pageInfo;
  const initialLoading = loading && occurrences.length === 0;
  const pagingLoading = loading && occurrences.length > 0;
  const isEmpty = occurrences.length === 0;

  const getEventOccurrencesVariables = useMemo(() => {
    const dateRangeFilter = selectedDateRange
      ? {
          fromDate: selectedDateRange.from?.toISOString(),
          toDate: selectedDateRange.to?.toISOString(),
        }
      : {
          fromDate: type === 'upcoming' ? new Date().toISOString() : null,
          toDate: type === 'past' ? new Date().toISOString() : null,
        };

    console.log(dateRangeFilter);

    return {
      eventId: selectedParentEvent?.id ?? '',
      take: 10,
      ...dateRangeFilter,
    };
  }, [selectedDateRange, selectedParentEvent?.id, type]);

  useEffect(() => {
    if (selectedParentEvent?.id) {
      getEventOccurrences({
        variables: {
          input: {
            ...getEventOccurrencesVariables,
          },
        },
        notifyOnNetworkStatusChange: true,
      });
    }
  }, [selectedParentEvent, getEventOccurrences, getEventOccurrencesVariables]);

  const handleLoadMore = () => {
    if (pagingData?.hasNextPage) {
      fetchMore({
        variables: {
          input: {
            ...getEventOccurrencesVariables,
            cursor: {
              id: pagingData?.endCursor,
            },
          },
        },
        updateQuery(previousData, { fetchMoreResult }) {
          return {
            eventOccurrences: {
              ...previousData.eventOccurrences,
              results: [...previousData.eventOccurrences.results, ...fetchMoreResult.eventOccurrences.results],
              pageInfo: fetchMoreResult.eventOccurrences.pageInfo,
            },
          };
        },
      });
    }
  };

  return (
    <CommandGroup>
      {(!initialLoading || !selectedDateRange) && (
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={setSelectedDateRange}
          className="w-full mb-4 h-10"
          buttonClassName="w-full mb-4 h-12 border-muted-foreground"
          fromDate={type === 'upcoming' ? new Date() : undefined}
          toDate={type === 'past' ? new Date() : undefined}
        />
      )}
      {initialLoading && <Loader size={12} className="my-[24vh]" />}
      {!initialLoading && isEmpty && <CommandEmpty>{formatMessage({ id: 'navBar.noEventFound' })}</CommandEmpty>}

      <CommandList className={`p-0 h-[70vh] max-h-[70vh] overflow-y-auto sm:h-auto sm:max-h-[50vh]`}>
        {!initialLoading &&
          occurrences.map((event) => (
            <CommandItem
              key={event?.id}
              value={formatEventDateRange({
                startAt: new Date(event.startAt),
                endAt: new Date(event.endAt),
                locale: locale,
              })}
              onSelect={() => {
                handleSelectEvent({
                  id: event?.id,
                  name: event?.name,
                  media: event?.media as FlipMedia[],
                  startAt: event?.startAt,
                  endAt: event?.endAt,
                  isMultipleDay: event?.isMultipleDay,
                  isParentEvent: false,
                });
              }}
              className={`cursor-pointer rounded-xl border my-2 sm:my-0 sm:mb-2`}
            >
              <div className="flex gap-3 p-1 w-full justify-between">
                <div className="flex flex-col gap-1.5 flex-[4] flex-grow max-w-[82%] pt-1">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center gap-1 max-w-full">
                      <p className={`whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-base`}>
                        {formatEventDateRange({
                          startAt: new Date(event.startAt),
                          endAt: new Date(event.endAt),
                          locale: locale,
                        })}
                      </p>
                    </div>
                  </div>
                  {event?.address?.address && (
                    <p className={`text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis`}>
                      {event.address.address}
                    </p>
                  )}
                </div>
                <div className="">
                  {currentEvent?.id === event.id ? (
                    <div className="w-4 h-4 relative">
                      <div className="w-4 h-4 left-0 top-0 absolute rounded-full border border-slate-900 dark:border-slate-50"></div>
                      <div className="w-2.5 h-2.5 left-[3px] top-[3px] absolute bg-slate-900 dark:bg-slate-50 rounded-full border border-slate-900 dark:border-slate-50"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-900 dark:border-slate-50"></div>
                  )}
                </div>
              </div>
            </CommandItem>
          ))}
        {pagingData?.hasNextPage && (
          <div className="flex justify-center w-full pb-2">
            <Button variant="outline" onClick={handleLoadMore} loading={pagingLoading}>
              {formatMessage({ id: 'organizer.event.loadMore' })}
              <ChevronDownIcon size={16} />
            </Button>
          </div>
        )}
      </CommandList>
    </CommandGroup>
  );
}
