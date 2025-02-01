'use client';

import { useRouter } from 'next/navigation';
import { useEventByIdQuery, useGetSeatMapLazyQuery, useGetTicketTiersQuery } from '@/lib/__generated__/graphql';
import SeatMapEditor from '@/app/organizer/seat-map/components/SeatMapEditor';
import { useRecoilState } from 'recoil';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import Loader from '@/components/loading-indicator/Loader';

export default function EventSeatMapPage() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [currentEvent] = useRecoilState(currentEventState);

  useEffect(() => {
    if (!currentEvent) {
      router.replace('/organizer');
    }
  }, [currentEvent, router]);

  const eventId = currentEvent?.id ?? '';

  const [getSeatMap, { data: seatMapData, loading: seatMapLoading, error: seatMapError }] = useGetSeatMapLazyQuery({
    variables: {
      input: {
        eventId,
      },
    },
  });

  const {
    data,
    loading: eventLoading,
    error,
    refetch: refetchEvent,
  } = useEventByIdQuery({
    variables: {
      id: eventId,
    },
  });

  const {
    data: ticketTiersData,
    loading: ticketTiersLoading,
    error: ticketTiersError,
  } = useGetTicketTiersQuery({
    variables: {
      data: {
        eventId,
        loadToCache: false,
      },
    },
  });

  const event = data?.eventById;

  useEffect(() => {
    if (event?.hasSeatMap) {
      getSeatMap();
    }
  }, [event?.hasSeatMap, getSeatMap]);

  if (eventLoading || ticketTiersLoading || seatMapLoading) {
    return (
      <div className="container mx-auto p-6">
        <Loader />
      </div>
    );
  }

  if (error || seatMapError || ticketTiersError || !data?.eventById) {
    return (
      <div className="container mx-auto p-6">
        <p>{formatMessage({ id: 'organizer.seatMap.errorLoadingEventData' })}</p>
      </div>
    );
  }

  if (!event?.hasSeatMap) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="max-w-lg mx-auto bg-gray-50 rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">{formatMessage({ id: 'organizer.seatMap.notFound' })}</h2>
          <p className="text-gray-600 mb-4">{formatMessage({ id: 'organizer.seatMap.notFoundDes' })}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full">
      <h1 className="font-semibold text-[34px] my-5 text-center md:text-start">
        {formatMessage({ id: 'organizer.seatMap.title' })}
      </h1>

      <SeatMapEditor
        eventId={eventId}
        organizationId={event.organizationId}
        initialSvgUrl={event.seatMap?.url}
        tierRules={event.seatMap?.tierRules}
        holdSeatRules={event.seatMap?.holdSeatRules}
        tiers={
          ticketTiersData?.getTicketTiers.map((item) => ({
            id: item.id,
            name: item.name,
            background: item.metadata.background,
            border: item.metadata.border,
            seatCount: 0,
          })) || []
        }
        eventName={event.name}
        cover={event.media?.[0]?.url || ''}
        startAt={event.startAt}
        endAt={event.endAt}
        refetchSeatMap={refetchEvent}
        reservingSeats={seatMapData?.getEventSeatMap?.reservingSeats}
        soldSeats={seatMapData?.getEventSeatMap?.soldSeats}
      />
    </div>
  );
}
