import ExternalEventTimeline from '@/components/event/ExternalEventTimeline';
import { FlipExternalEvent, ReviewStatus, useExternalEventsQuery } from '@/lib/__generated__/graphql';
import { cn } from '@/lib/utils';
;

type Props = {
  artistHandle?: string;
  organizationHandle?: string;
  sort?: 'asc' | 'desc';
  saleStatus?: 'ON_SALE' | 'PAST' | 'UPCOMING' | undefined;
  showEmptyState?: boolean;
  title?: string;
  hideIfNoResult?: boolean;
  isCenter?: boolean;
};

export default function ExternalEventFeedContainer({
  artistHandle,
  organizationHandle,
  sort = 'asc',
  saleStatus,
  showEmptyState = true,
  title,
  hideIfNoResult = false,
  isCenter = false,
}: Props) {
  const { data, loading } = useExternalEventsQuery({
    variables: {
      data: {
        cursor: undefined,
        take: 20,
        where: {
          artistHandle,
          organizationHandle,
          reviewStatus: ReviewStatus.Approved,
        },
        sort: {
          startAt: sort,
        },
      },
    },
  });

  const events: FlipExternalEvent[] = (data?.externalEvents as FlipExternalEvent[]) || [];
  if (events.length === 0 && hideIfNoResult) {
    return null;
  }

  return (
    <div className={cn('flex w-full', isCenter && 'flex w-full justify-center items-center')}>
      <div className={cn('flex flex-col gap-8 w-full max-w-[800px] ')}>
        {title && (
          <div className="md:-mt-4 flex items-center gap-2">
            <p className="text-2xl font-semibold">{title}</p>
            {/* <RadioIcon size={24} color="red" /> */}
          </div>
        )}
        <ExternalEventTimeline events={events} loading={loading} showEmptyState={showEmptyState} />{' '}
      </div>
    </div>
  );
}
