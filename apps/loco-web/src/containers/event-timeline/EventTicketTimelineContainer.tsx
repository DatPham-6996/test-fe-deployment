import EventTimeline from '@/components/event/EventTimeline';
import { FlipEvent, useMyTicketsQuery } from '@/lib/__generated__/graphql';

type Props = {
  isOnClickToEvent?: boolean;
  showEventStatus?: boolean;
};

export default function EventTicketTimelineContainer({ isOnClickToEvent, showEventStatus }: Props) {
  const { data, loading, fetchMore } = useMyTicketsQuery({
    variables: {
      data: {
        pagination: {
          page: 1,
          size: 10,
        },
      },
    },
    fetchPolicy: 'network-only',
  });

  const events: FlipEvent[] = (data?.getMyTickets?.results as FlipEvent[]) || [];

  return (
    <EventTimeline
      events={events}
      loading={loading}
      onLoadMore={() => {
        fetchMore({
          variables: {
            data: {
              pagination: {
                page: Math.floor(events.length / 10) + 1,
                size: 10,
              },
            },
          },
        });
      }}
      isOnClickToEvent={isOnClickToEvent}
      showEventStatus={showEventStatus}
    />
  );
}
