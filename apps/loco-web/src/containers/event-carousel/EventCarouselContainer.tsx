import EventCardCarousel from '@/components/event/EventCardCarousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNumberNav } from '@/components/shadcn/ui/carousel';
import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { EVENT_FRAGMENT } from '@/graphql/fragments';
import { FlipEvent } from '@/lib/__generated__/graphql';
import { cn } from '@/lib/utils';
import { FLIP_ORG_ID } from '@/lib/utils/constants';
import { gql, useQuery } from '@apollo/client';
import { useGateValue } from '@statsig/react-bindings';
import { isMobile } from 'react-device-detect';

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
  featureFirst?: boolean;
  title?: string;
  hideIfNoResult?: boolean;
  hideNav?: boolean;
};

export default function EventCarouselContainer({
  isDemo = false,
  organizationHandle,
  sort = 'asc',
  saleStatus,
  featureFirst = false,
  title,
  hideIfNoResult = false,
  hideNav = false,
}: Props) {
  const { data, loading } = useQuery(EVENT_FEED_QUERY, {
    variables: {
      input: {
        cursor: undefined,
        take: featureFirst ? 1 : 10,
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
  const isFlipTest = useGateValue('flip_prod_test');

  const events: FlipEvent[] = (data?.events?.results as FlipEvent[]) || [];

  if (featureFirst && events.length > 0) {
    const event = events[0];
    return <EventCardCarousel event={event} />;
  }

  if (events.length === 0 && hideIfNoResult) {
    return null;
  }

  return (
    <div className="w-full">
      <Carousel opts={{ align: 'start' }}>
        <div className={cn('flex flex-col gap-6')}>
          {title && (
            <div className={cn('flex items-center justify-between', isMobile && 'ml-2')}>
              <h2 className="text-2xl font-semibold">{title}</h2>
              {!hideNav && <CarouselNumberNav />}
            </div>
          )}
          <CarouselContent className="-ml-6">
            {loading
              ? new Array(3).fill(0).map((_, index) => (
                  <CarouselItem key={index} className="pl-6 basis-[80%] md:basis-[50%] lg:basis-[40%]">
                    <SkeletonCard index={index} />
                  </CarouselItem>
                ))
              : events.map((event, index) => {
                  if (event?.organization?.id === FLIP_ORG_ID && !isFlipTest) return null;
                  return (
                    <CarouselItem key={index} className="pl-6 basis-[80%] md:basis-[50%] lg:basis-[40%]">
                      <EventCardCarousel event={event} index={index} />
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
