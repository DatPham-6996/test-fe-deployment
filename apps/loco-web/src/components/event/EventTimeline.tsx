'use client';

import EventCard from '@/components/event/EventCard';
import TicketModalContainer from '@/containers/ticket-modal-container';
import { FlipEvent } from '@/lib/__generated__/graphql';
import { FLIP_ORG_ID } from '@/lib/utils/constants';
import { useGateValue } from '@statsig/react-bindings';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { SkeletonCard } from '../skeletons/SkeletonCard';

type EventTimelineProps = {
  events: FlipEvent[];
  loading?: boolean;
  onLoadMore?: () => void;
  isOnClickToEvent?: boolean;
  showEventStatus?: boolean;
};

export default function EventTimeline({
  events,
  loading,
  onLoadMore,
  isOnClickToEvent = true,
  showEventStatus = false,
}: EventTimelineProps) {
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [ticketIds, setTicketIds] = useState<string[]>([]);
  const isFlipTest = useGateValue('flip_prod_test');
  const isBCT = useGateValue('bo_cong_thuong');

  const { formatMessage } = useIntl();

  const viewTicket = (tickets: string[]) => {
    try {
      if (tickets.length > 0) {
        setTicketIds(tickets);
        setOpenTicketModal(true);
      }
    } catch (e) {
      console.error('Error viewing ticket', e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        onLoadMore &&
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [events, onLoadMore]);

  return (
    <div className="flex justify-center">
      {loading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full">
          {new Array(5).fill(0).map((_, index) => {
            return <SkeletonCard key={index} index={index} />;
          })}
        </div>
      )}

      {!loading && !events.length ? (
        <div className="flex flex-col justify-center items-center">
          <CalendarDays size={100} color="gray" strokeWidth={1} />

          <div className="flex flex-col gap-4 mt-8 text-center">
            <p className="font-bold text-lg">{formatMessage({ id: 'me.tickets.noEvents' })}</p>

            <p className="font-normal text-sm text-muted-foreground">
              {formatMessage({ id: 'me.tickets.exploreAroundYou' })}
            </p>
          </div>
        </div>
      ) : null}

      {!loading && events.length > 0 && (
        <div className="flex flex-col items-center w-full">
          {events.map((event: FlipEvent, index: number) => {
            // Filter out all events from Flip and user not belong to Flip Team
            if (isBCT) {
              if (event?.handle === 'test-only-nhac-thinh-phong-2060165527') {
                return (
                  <EventCard
                    key={event.id}
                    index={index}
                    event={event}
                    onTicketClick={viewTicket}
                    isOnClickToEvent={isOnClickToEvent}
                    showEventStatus={showEventStatus}
                  />
                );
              } else {
                return;
              }
            }
            else if (event?.organization?.id === FLIP_ORG_ID && !isFlipTest) return;

            return (
              <EventCard
                key={event.id}
                index={index}
                event={event}
                onTicketClick={viewTicket}
                isOnClickToEvent={isOnClickToEvent}
                showEventStatus={showEventStatus}
              />
            );
          })}

          {ticketIds.length > 0 && (
            <TicketModalContainer
              ticketIds={ticketIds}
              isOpen={openTicketModal}
              onClose={() => setOpenTicketModal(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
