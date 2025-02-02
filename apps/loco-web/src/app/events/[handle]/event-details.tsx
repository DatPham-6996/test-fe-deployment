'use client';

import AddressCard from '@/components/address/address-card';
import { Calendar } from '@/components/Calendar';
import { Card, CardBody, CardHeader } from '@/components/card';
import FixedLoader from '@/components/loading-indicator/FixedLoader';
import OrganizerCard from '@/components/organizer/OrganizerCard';
import RefundPolicy from '@/components/refund/RefundPolicy';
import { Badge } from '@/components/shadcn/ui/badge';
import { Separator } from '@/components/shadcn/ui/separator';
import { TicketCardSeatReservation } from '@/components/ticket-card';
import ZoomableImage from '@/components/zoomable-image';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipLayout } from '@/containers/flip-layout';
import { SubEventCardContainer } from '@/containers/sub-event-card/sub-event-card-container';
import { GeneralAdmissionTicketCardContainer } from '@/containers/ticket-card/GeneralAdmissionTicketCardContainer';
import { EVENT_DETAILS_FRAGMENT, PARENT_EVENT_DETAILS_FRAGMENT } from '@/graphql/fragments';
import {
  FlipAddress,
  FlipEvent,
  FlipVenue,
  Maybe,
  useGetTicketTiersLazyQuery,
  useParentEventSuspenseQuery,
} from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { FLIP_ORG_ID } from '@/lib/utils/constants';
import { stringToLuxonVN, toVnDateFormat } from '@/lib/utils/time-format';
import { toastSuccess } from '@/lib/utils/toast';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { gql } from '@apollo/client';
import { useGateValue } from '@statsig/react-bindings';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import { MapPinIcon, ShareIcon, Theater } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

const EVENT_DETAILS_QUERY = gql`
  ${EVENT_DETAILS_FRAGMENT}
  query EventDetails($handle: String!) {
    event(handle: $handle) {
      ...EventDetails_event
    }
  }
`;

const PARENT_EVENT_QUERY = gql`
  ${PARENT_EVENT_DETAILS_FRAGMENT}
  query ParentEvent($handle: String!) {
    parentEvent(handle: $handle) {
      ...ParentEventDetails_event
    }
  }
`;

// Create a custom parser options object
const createParserOptions = (imgAlt: string): HTMLReactParserOptions => ({
  replace: (domNode: any) => {
    if (domNode.name === 'img' && domNode.attribs) {
      return (
        <ZoomableImage
          src={domNode.attribs.src}
          alt={domNode.attribs.alt || imgAlt}
        />
      );
    }
  }
});

export default function EventDetails() {
  const { formatMessage } = useIntl();

  const params = useParams();
  const { handle } = params;
  const { logEvent } = useLogEvent();
  const { locale } = useLocale();
  const isFlipTest = useGateValue('flip_prod_test');
  const isBCT = useGateValue('bo_cong_thuong');
  const router = useRouter();

  const [getEventTicketTiers, { data: ticketTiersQuery, loading: ticketTiersLoading }] = useGetTicketTiersLazyQuery();

  const { data } = useParentEventSuspenseQuery({
    variables: {
      handle: handle as string,
    },
    fetchPolicy: 'network-only',
  });

  const [isLoading, setIsLoading] = useState(true);

  const ticketTiers = ticketTiersQuery?.getTicketTiers;

  useEffect(() => {
    if (!isBCT && data?.parentEvent?.organization?.id === FLIP_ORG_ID && !isFlipTest) {
      router.replace('/');
    }
  }, [data?.parentEvent?.organization?.id, isFlipTest, isBCT, router]);

  useEffect(() => {
    if (data?.parentEvent.id) {
      logEvent({
        eventName: 'event_details_viewed',
        value: data?.parentEvent.id,
        event: data?.parentEvent as Maybe<FlipEvent>,
      });
    }
  }, [data?.parentEvent, data?.parentEvent.id, logEvent]);

  useEffect(() => {
    if (!data?.parentEvent) return;
    if (data?.parentEvent.id) {
      setIsLoading(true);
      getEventTicketTiers({ variables: { data: { eventId: data?.parentEvent.id } } }).finally(() =>
        setIsLoading(false)
      );
    }
  }, [data, getEventTicketTiers]);

  const {
    id: eventId,
    name,
    description,
    startAt,
    endAt,
    address,
    media,
    venue,
    organization: {
      name: organizationName,
      logoURL: organizationLogoURL,
      contactEmail: organizationContactEmail,
      handle: organizationHandle,
    },
    mediaCollection,
    hasSeatMap,
    maxTicketPerOrder,
    onsale,
    isOnSale,
    isMultipleDay,
  } = data?.parentEvent || ({} as FlipEvent);

  const getCoverPhoto = () => {
    if (mediaCollection.cover && media && media.length) {
      return media.find((item) => mediaCollection.cover === item.id);
    }
    return null;
  };

  const startDate = stringToLuxonVN(startAt, locale);
  const endDate = stringToLuxonVN(endAt, locale);
  const isUpcoming = onsale ? new Date(onsale) > new Date() : false;

  const coverPhoto = getCoverPhoto();
  const parserOptions = description ? createParserOptions(name) : undefined;

  return (
    <FlipLayout>
      <ContentCenterNarrow maxWidth={950}>
        <div className="px-0 container mx-auto">
          <div className="p-1">
            <Card className="pt-0">
              <div className="flex flex-col justify-center h-52 md:h-[446px] px-2 pt-2">
                {coverPhoto && (
                  <Image
                    className="rounded-md h-full w-full object-cover"
                    width={936}
                    height={468}
                    src={coverPhoto.url}
                    alt={name}
                  />
                )}
              </div>

              <div className="mt-5 px-5">
                <div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-3xl font-semibold leading-tight">{name}</p>

                      <div className="flex items-center gap-2 mt-2.5">
                        {organizationLogoURL && (
                          <Image
                            className="w-5 h-5 rounded-full"
                            width={20}
                            height={20}
                            src={organizationLogoURL}
                            alt={organizationName || ''}
                          />
                        )}
                        <p className="text-muted-foreground text-sm">{organizationName}</p>
                        {/* <CaretRight /> */}
                      </div>
                    </div>
                    <Badge
                      className="h-10 w-10 justify-end m-2 hover:cursor-pointer"
                      variant={'secondary'}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toastSuccess(formatMessage({ id: 'operation.copiedLink' }));
                      }}
                    >
                      <ShareIcon color="gray" />
                    </Badge>
                  </div>
                </div>

                {!isMultipleDay && (
                  <div className="flex sm:flex-row flex-col mt-5 gap-4 justify-between">
                    {/* Calendar */}
                    <div className="flex gap-3">
                      <Calendar date={startAt} />

                      <div className="flex flex-col">
                        <p className="font-medium">{toVnDateFormat(startDate, false, locale)}</p>
                        <p className="text-muted-foreground">
                          {startDate.toFormat('HH:mm')} - {endDate.toFormat('HH:mm')}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center border border-neutral-200 overflow-hidden rounded-xl w-12 h-12">
                        <MapPinIcon className="stroke-1" />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <p className="font-medium">{venue?.name}</p>
                        </div>

                        <p className="text-muted-foreground">{address?.city}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-y-3 sm:gap-x-3">
            {/* Ticket */}
            <div className="flex flex-col gap-3" style={{ gridColumn: '1 / 3' }}>
              {isMultipleDay && data?.parentEvent && (
                <SubEventCardContainer
                  parentEventId={data.parentEvent.id}
                  defaultVenueName={data.parentEvent.venue?.name}
                />
              )}
              {!isMultipleDay && (
                <Suspense fallback={<FixedLoader />}>
                  {isLoading ? (
                    <FixedLoader />
                  ) : !hasSeatMap ? (
                    <GeneralAdmissionTicketCardContainer
                      eventId={eventId}
                      maxTicketQuantity={maxTicketPerOrder ?? 10}
                      isOnSale={isOnSale}
                      isUpcoming={isUpcoming}
                    />
                  ) : (
                    ticketTiers &&
                    ticketTiers.length !== 0 && (
                      <TicketCardSeatReservation
                        eventId={eventId}
                        handle={handle as string}
                        minPrice={ticketTiers[ticketTiers.length - 1].price}
                        maxPrice={ticketTiers[0].price}
                        isOnSale={isOnSale}
                        isUpcoming={isUpcoming}
                      />
                    )
                  )}
                </Suspense>
              )}

              {/* Description */}
              <Card>
                <CardHeader title={formatMessage({ id: 'eventDetail.aboutEvent' })} icon={<Theater size={18} />} />
                <Separator orientation="horizontal" />
                <CardBody>
                  <div className="mt-2">
                    {description ? parse(description, parserOptions) : 'Không có mô tả'}
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-col gap-3">
              {data?.parentEvent?.policy && <RefundPolicy policy={data?.parentEvent?.policy} />}

              <AddressCard venue={venue as FlipVenue} address={address as FlipAddress} />

              <OrganizerCard
                organizationLogoURL={organizationLogoURL || ''}
                organizationName={organizationName}
                organizationContactEmail={organizationContactEmail || ''}
                organizationHandle={organizationHandle || ''}
              />
            </div>
          </div>
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
