'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn/ui/command';
import { useGetMyEventsLazyQuery, FlipEvent, FlipMedia } from '@/lib/__generated__/graphql';
import { formatEventDateRange } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useIntl } from 'react-intl';
import { OrganizerPage } from './LeftNav';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import Loader from '@/components/loading-indicator/Loader';
import { ChevronRightIcon } from 'lucide-react';
import EventOccurrencesSelector from '@/components/event/EventOccurrencesSelector';
import { useRouter } from 'next/navigation';

type SelectedEvent = Pick<FlipEvent, 'id' | 'name' | 'media' | 'startAt' | 'endAt' | 'isMultipleDay' | 'isParentEvent'>;

export default function EventCommand(props: { selectedSection: OrganizerPage; closeAllSelectors: () => void }) {
  const { selectedSection, closeAllSelectors } = props;
  const { formatMessage } = useIntl();
  const router = useRouter();
  const setCurrentEvent = useSetRecoilState(currentEventState);
  const [selectedParentEvent, setSelectedParentEvent] = useState<Pick<FlipEvent, 'id' | 'name' | 'media'> | null>(null);

  const handleSelectEvent = (event: SelectedEvent) => {
    if (event.isMultipleDay && event.isParentEvent) {
      setSelectedParentEvent(event);
    } else {
      setCurrentEvent({
        id: event?.id,
        name: event?.name,
        imageURL: event?.media?.[0]?.url ?? '',
        startAt: event?.startAt ?? '',
        endAt: event?.endAt ?? '',
      });
      closeAllSelectors();
      setSelectedParentEvent(null);
      if (selectedSection === OrganizerPage.HOMEPAGE) {
        router.push(`/organizer/marketing`);
      }
    }
  };

  return (
    <>
      {!selectedParentEvent && <EventList handleSelectEvent={handleSelectEvent} />}
      {selectedParentEvent && (
        <p className="text-xl font-bold my-4 mx-3 text-center truncate hidden sm:visible">
          {selectedParentEvent?.name}
        </p>
      )}
      {selectedParentEvent && (
        <EventOccurrencesSelector
          selectedParentEvent={selectedParentEvent}
          handleSelectEvent={handleSelectEvent}
          className="mt-1 w-full sm:w-[400px] "
        />
      )}
    </>
  );
}

function EventList(props: { handleSelectEvent: (event: SelectedEvent) => void }) {
  const { handleSelectEvent } = props;
  const [currentOrg] = useRecoilState(currentOrgState);
  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);
  const [getMyEvents, { data: myEvent, loading: myEventLoading }] = useGetMyEventsLazyQuery();
  const { formatMessage } = useIntl();
  const { locale } = useLocale();

  useEffect(() => {
    (async () => {
      if (currentOrg?.id) {
        await getMyEvents({ variables: { data: { organizationId: currentOrg.id, pagination: { size: 10 } } } });
      }
    })();
  }, [currentOrg, getMyEvents]);

  return (
    <Command className={`mt-1 w-full sm:w-[400px]`}>
      <CommandInput placeholder={formatMessage({ id: 'navBar.searchEvent' })} className="" />
      <CommandGroup>
        {myEventLoading && <Loader size={12} className="my-4" />}
        {!myEventLoading && myEvent?.getMyEvents?.events?.length === 0 && (
          <CommandEmpty>{formatMessage({ id: 'navBar.noEventFound' })}</CommandEmpty>
        )}
        <CommandList className={`p-0 h-[80vh] max-h-[80vh] overflow-y-auto sm:h-auto sm:max-h-[50vh]`}>
          {!myEventLoading &&
            (myEvent?.getMyEvents?.events ?? []).map((event, index) => (
              <>
                <CommandItem
                  key={event?.id}
                  value={event?.name}
                  onSelect={() => {
                    handleSelectEvent({
                      id: event?.id,
                      name: event?.name,
                      media: event?.media as FlipMedia[],
                      startAt: event?.startAt,
                      endAt: event?.endAt,
                      isMultipleDay: event?.isMultipleDay,
                      isParentEvent: event?.isParentEvent,
                    });
                  }}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  className={`cursor-pointer sm:my-1 mx-0 p-0 my-1`}
                >
                  <div className="flex gap-3 w-full justify-between hover:bg-gray-100 dark:hover:bg-secondary rounded-xl p-2">
                    <div className="flex w-20 h-20 flex-none relative">
                      {event?.media?.[0]?.url ? (
                        <Image src={event?.media?.[0]?.url} className="rounded-md object-cover" alt="event-logo" fill />
                      ) : (
                        <div className="bg-[#FACC15] text-3xl w-full h-full rounded-md object-cover justify-center items-center flex text-black">
                          {event?.name?.charAt(0)?.toLocaleUpperCase() ?? 'F'}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0 pt-1">
                      <p className={`font-semibold text-base truncate`}>{event.name}</p>
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center gap-1 max-w-full">
                          <p className={`truncate`}>
                            {event.isMultipleDay
                              ? formatMessage({ id: 'organizer.event.multipleDay' })
                              : formatEventDateRange({
                                  startAt: new Date(event.startAt),
                                  endAt: new Date(event.endAt),
                                  locale: locale,
                                })}
                          </p>
                        </div>
                      </div>
                      {event?.address?.address && (
                        <p className={`text-muted-foreground truncate`}>{event.address.address}</p>
                      )}
                    </div>
                    <div className="flex flex-none">
                      {event.isMultipleDay ? (
                        <div>
                          <ChevronRightIcon size={20} className="text-muted-foreground" />
                        </div>
                      ) : currentEvent?.id === event.id ? (
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
                {index !== (myEvent?.getMyEvents?.events?.length ?? 0) - 1 && (
                  <CommandSeparator className="mx-3 my-2" />
                )}
              </>
            ))}
        </CommandList>
      </CommandGroup>
    </Command>
  );
}
