import EventTimeline from '@/components/event/EventTimeline';
import { EVENT_FRAGMENT } from '@/graphql/fragments';
import { FlipEvent } from '@/lib/__generated__/graphql';
import { cn } from '@/lib/utils';
import { gql, useQuery } from '@apollo/client';
const EVENT_FEED_QUERY = gql`
  ${EVENT_FRAGMENT}
  query Events($input: GetEventsInput!) {
    events(input: $input) {
      results {
        ...EventFragment
      }
    }
  }
`;

type Props = {
  isDemo?: boolean;
  organizationHandle?: string;
  sort?: 'asc' | 'desc';
  saleStatus?: 'ON_SALE' | 'PAST' | 'UPCOMING' | undefined;
  title?: string;
  hideIfNoResult?: boolean;
  isCenter?: boolean;
};

export default function EventFeedContainer({
  isDemo = false,
  organizationHandle,
  sort = 'asc',
  saleStatus,
  title,
  hideIfNoResult = false,
  isCenter = false,
}: Props) {
  const { data, loading } = useQuery(EVENT_FEED_QUERY, {
    variables: {
      input: {
        cursor: undefined,
        take: 20,
        where: {
          status: isDemo ? 'DEMO' : 'PUBLISHED',
          organizationHandle,
          saleStatus,
        },
        sort: {
          startAt: sort,
        },
      },
    },
  });

  const events: FlipEvent[] = (data?.events?.results as FlipEvent[]) || [];

  if (events.length === 0 && hideIfNoResult) {
    return null;
  }
  return (
    <div className={cn('flex w-full', isCenter && 'justify-center items-center')}>
      <div className={cn('flex flex-col gap-8 w-full max-w-[800px]')}>
        {title && (
          <div className="md:-mt-4 flex items-center gap-2">
            <p className="text-2xl font-semibold">{title}</p>
            {/* <RadioIcon size={24} color="red" /> */}
          </div>
        )}
        <EventTimeline events={events} loading={loading} showEventStatus={true} />
      </div>
    </div>
  );
}
