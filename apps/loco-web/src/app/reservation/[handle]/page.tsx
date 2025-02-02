'use client';

import {
  selectedEntitiesSelector,
  SelectedSeatOrSection,
} from '@/state-management/seatmap/selectors/selected-seats-selector';
import isEqual from 'lodash.isequal';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { ReactZoomPanPinchRef, TransformComponent, TransformWrapper, useControls } from 'react-zoom-pan-pinch';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import EventInfoRow from '@/components/event/EventInfoRow';
import Loader from '@/components/loading-indicator/Loader';
import { TicketTierInfoList } from '@/components/seat-type-items';
import { FlipLayout } from '@/containers/flip-layout';
import { SeatMapContainer } from '@/containers/seatmap';
import { SelectedSeatContainer } from '@/containers/selected-seat';
import {
  useDeleteReservationSessionMutation,
  useEventDetailsQuery,
  useGetReservationSessionByEventLazyQuery,
  useGetSeatMapLazyQuery,
  useGetTicketTiersLazyQuery,
} from '@/lib/__generated__/graphql';
import { totalPriceSelector } from '@/state-management/price/selectors/total-price-selector';
import { tiersState } from '@/state-management/seatmap/atoms/all-tiers-state';
import { selectedSeatsState } from '@/state-management/seatmap/atoms/selected-seats-state';
import { unavailableSeatsState } from '@/state-management/seatmap/atoms/unavailable-seats-state';
import {
  CalendarDaysIcon,
  CheckIcon,
  ChevronUp,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  RefreshCcwIcon,
  SlashIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { DeleteReservationAlert } from '@/components/alert/DeleteReservationAlert';
import { Badge } from '@/components/shadcn/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/shadcn/ui/carousel';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/shadcn/ui/drawer';
import PricingBoxContainer from '@/containers/pricing-box';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils/format';
import { formatTime, toVnShortDateFormat } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { useAuth } from '@/state-management/hooks/useAuth';
import { DateTime } from 'luxon';
import { useRouter } from 'next-nprogress-bar';
import { isMobile } from 'react-device-detect';

import { entityIdToSectionNameState } from '@/state-management/seatmap/atoms/entity-id-to-section-name-state';
import { gaSectionInventoryState } from '@/state-management/seatmap/atoms/ga-section-inventory-state';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';
import { showSeatLabelState } from '@/state-management/seatmap/atoms/show-seat-label-state';
import { Separator } from '@radix-ui/react-separator';
import './styles.css';

export default function ReservationPage() {
  const { formatMessage } = useIntl();
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const { theme, systemTheme, setTheme } = useTheme();
  const { locale } = useLocale();
  const { handle } = useParams();
  const router = useRouter();
  const { isLoggedIn, currentUser } = useAuth();
  const { data: eventDetails } = useEventDetailsQuery({
    variables: { handle: handle as string },
  });
  const [confirmDeleteReservation, setConfirmDeleteReservation] = useState(false);
  const [isDeleteReservation, setIsDeleteReservation] = useState(false);
  const [openDeleteReservationAlert, setOpenDeleteReservationAlert] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const [getEventTicketTiers, { data: ticketTiers, loading: ticketTiersLoading }] = useGetTicketTiersLazyQuery();
  const [getSeatMap, { data: seatMap, loading: seatMapLoading, refetch: refetchSeatMap }] = useGetSeatMapLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [deleteReservationSession] = useDeleteReservationSessionMutation({
    variables: { input: { eventHandle: handle as string } },
  });

  const [getReservationSessionByEvent, { data: getReservationSessionByEventData, loading: reservationSessionLoading }] =
    useGetReservationSessionByEventLazyQuery({
      variables: { input: { eventHandle: handle as string } },
      fetchPolicy: 'no-cache',
    });
  const reservationSession = getReservationSessionByEventData?.getReservationSessionByEvent;

  useEffect(() => {
    if (!isLoggedIn || !currentUser?.emailVerified) return;
    getReservationSessionByEvent();
  }, [isLoggedIn, currentUser?.emailVerified, getReservationSessionByEvent]);

  const event = eventDetails?.event;

  const setTiers = useSetRecoilState(tiersState(event?.id ?? ''));
  const setGASectionInventory = useSetRecoilState(gaSectionInventoryState(event?.id ?? ''));
  const selectedSeats = useRecoilValue(selectedSeatsState(event?.id ?? ''));
  const selectedEntitiesObjects = useRecoilValue(selectedEntitiesSelector(event?.id ?? ''));
  const entityIdToSectionName = useRecoilValue(entityIdToSectionNameState(event?.id ?? ''));
  const selectedEntities = useRecoilValue(selectedEntitiesState(event?.id ?? ''));
  const setSelectedSeats = useSetRecoilState(selectedSeatsState(event?.id ?? ''));
  const setSelectedEntities = useSetRecoilState(selectedEntitiesState(event?.id ?? ''));
  const setUnavailableSeats = useSetRecoilState(unavailableSeatsState(event?.id ?? ''));
  const subTotal = useRecoilValue(totalPriceSelector(event?.id ?? ''));
  const [showSeatLabelStateValue, setShowSeatLabelState] = useRecoilState(showSeatLabelState(event?.id ?? ''));

  useEffect(() => {
    if (!isLoggedIn || !currentUser?.emailVerified) return;

    if (reservationSessionLoading) return;

    if (!reservationSession) return;

    if (isDeleteReservation) return;

    if (reservationSession && !confirmDeleteReservation) {
      setOpenDeleteReservationAlert(true);
      return;
    }

    if (reservationSession && confirmDeleteReservation) {
      deleteReservationSession()
        .then(() => refetchSeatMap())
        .then(() => {
          setOpenDeleteReservationAlert(false);
          setIsDeleteReservation(true);
        });
    }
  }, [
    reservationSession,
    reservationSessionLoading,
    confirmDeleteReservation,
    deleteReservationSession,
    refetchSeatMap,
    currentUser?.emailVerified,
    isLoggedIn,
    isDeleteReservation,
  ]);

  useEffect(() => {
    if (!event) return;

    getEventTicketTiers({ variables: { data: { eventId: event.id } }, fetchPolicy: 'network-only' });
    getSeatMap({ variables: { input: { eventId: event.id } } });
  }, [event, getEventTicketTiers, getSeatMap]);

  useEffect(() => {
    if (!ticketTiers) return;

    const allTiers = ticketTiers.getTicketTiers;
    const allTiersMap = new Map();
    for (let tier of allTiers) {
      allTiersMap.set(tier.id, tier);
    }
    setTiers(allTiersMap);
  }, [ticketTiers, setTiers]);

  useEffect(() => {
    if (!seatMap) return;

    const gaSectionInventory = new Map();
    for (let sectionId in seatMap.getEventSeatMap.gaSectionInventory) {
      gaSectionInventory.set(sectionId, seatMap.getEventSeatMap.gaSectionInventory[sectionId]);
    }

    setGASectionInventory(gaSectionInventory);
  }, [seatMap, setGASectionInventory]);

  useEffect(() => {
    // if (useIsDarkTheme()) {
    //   setTheme('light');
    // }
  }, [theme, systemTheme, setTheme]);

  useEffect(() => {
    if (!seatMap) return;

    if (reservationSessionLoading) return;

    if (reservationSession && !isDeleteReservation) return;

    const unavailableSeats = new Set<string>();
    const newSelectedSeats = new Set<string>(selectedSeats);
    const deleteRequiredEntities: Record<string, boolean> = {};

    seatMap.getEventSeatMap.heldSeats.forEach((seatId) => {
      unavailableSeats.add(seatId);
      newSelectedSeats.delete(seatId);
      deleteRequiredEntities[seatId] = true;
    });

    seatMap.getEventSeatMap.reservingSeats.forEach((seatId) => {
      unavailableSeats.add(seatId);
      newSelectedSeats.delete(seatId);
      deleteRequiredEntities[seatId] = true;
    });

    seatMap.getEventSeatMap.soldSeats.forEach((seatId) => {
      unavailableSeats.add(seatId);
      newSelectedSeats.delete(seatId);
      deleteRequiredEntities[seatId] = true;
    });

    const newSelectedEntities = selectedEntities.filter((entityId) => !deleteRequiredEntities[entityId]);
    setUnavailableSeats(unavailableSeats);

    if (!isEqual(newSelectedEntities, selectedEntities)) {
      setSelectedEntities(newSelectedEntities);
    }

    if (!isEqual(newSelectedSeats, selectedSeats)) {
      setSelectedSeats(newSelectedSeats);
    }
  }, [
    seatMap,
    setUnavailableSeats,
    setSelectedSeats,
    selectedSeats,
    selectedEntities,
    setSelectedEntities,
    reservationSessionLoading,
    reservationSession,
    isDeleteReservation,
  ]);

  const getTierData = () => {
    if (!ticketTiers) {
      throw new Error('Ticket tiers not found');
    }

    return ticketTiers.getTicketTiers.map(({ id, name, price, metadata, description }) => {
      return {
        value: id,
        name: name,
        description: description,
        price: price.toString(),
        backgroundColor: metadata.background,
        borderColor: metadata.border,
      };
    });
  };

  const formatEntityName = (selectedEntity: SelectedSeatOrSection, entityIdToSectionName: Map<string, string>) => {
    if (selectedEntity.type === 'seat') {
      const sectionName = entityIdToSectionName.get(selectedEntity.seat!.id);
      const seatInfo = `${selectedEntity.seat!.row}-${selectedEntity.seat!.position}`;
      return sectionName ? `${sectionName} ${seatInfo}` : seatInfo;
    }

    return entityIdToSectionName.get(selectedEntity.section!.id) || '-';
  };

  if (!event || !ticketTiers?.getTicketTiers || ticketTiers?.getTicketTiers.length === 0) {
    return (
      <FlipLayout hideFooter={true} showHeaderDivider={true} className="min-h-screen">
        <div className="min-h-screen w-full place-content-center items-center flex flex-row">
          <Loader />
        </div>
      </FlipLayout>
    );
  }

  const getCoverPhoto = () => {
    if (!event) return '';

    if (event.mediaCollection && event.mediaCollection.cover && event.media && event.media.length) {
      return event.media.find((item) => event.mediaCollection.cover === item.id)?.url ?? '';
    }

    return '';
  };

  return (
    <FlipLayout hideFooter={true} showHeaderDivider={true} fixed={true} className="h-dvh overflow-y-hidden">
      <DeleteReservationAlert
        open={openDeleteReservationAlert}
        onConfirm={() => setConfirmDeleteReservation(true)}
        onCancel={() => {
          if (handle && reservationSession?.cartId) {
            router.push(`/checkout/${handle}/${reservationSession.cartId}`);
          }
        }}
        reservationSession={reservationSession}
      />
      <div className="h-seatmap-full h-screen flex flex-col-reverse sm:flex-row">
        {/* Left panel - Modified for mobile */}
        {isMobile ? (
          <>
            <Drawer open={openSheet} onOpenChange={setOpenSheet}>
              <div className={cn('fixed w-full transition-all duration-300', 'bottom-0 left-0 z-[50]')}>
                <DrawerTrigger asChild>
                  <button
                    className={cn(
                      'w-full bg-white dark:bg-muted pl-5 pr-3 py-2 border-t flex justify-between items-center',
                      'transform transition-all duration-300',
                      openSheet ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                    )}
                  >
                    {getCoverPhoto() && (
                      <div className={`flex w-[60px] h-[60px] flex-1.25 relative mr-4`}>
                        <Image
                          alt={'Event Image'}
                          fill
                          className={`rounded-md object-cover w-[60px] h-[60px]`}
                          src={getCoverPhoto()}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-0 flex-1 min-w-0">
                      <div className="flex flex-col gap-1.5 items-start flex-grow">
                        <p className={`font-medium text-base truncate max-w-[95%]`}>{event.name}</p>

                        <div className="flex gap-4">
                          {event.startAt && (
                            <div className="flex items-center justify-center gap-1">
                              <CalendarDaysIcon className={`h-4 w-4`} />
                              <p className={`text-xs`}>
                                {toVnShortDateFormat(DateTime.fromISO(event.startAt), false, locale)}
                              </p>
                            </div>
                          )}

                          {event.startAt && event.endAt && (
                            <div className="flex items-center justify-center gap-1">
                              <ClockIcon className={`h-4 w-4`} />
                              <p className={`text-xs`}>
                                {formatTime(DateTime.fromISO(event.startAt), locale)} -{' '}
                                {formatTime(DateTime.fromISO(event.endAt), locale)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronUp className={`transform transition-transform  ${openSheet ? 'rotate-180' : ''}`} />
                  </button>
                </DrawerTrigger>

                {/* Ticket Tiers Carousel */}
                <div
                  className={cn(
                    'bg-white dark:bg-muted px-4 pb-3 pt-2 relative',
                    'transform transition-all duration-300',
                    openSheet ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                  )}
                >
                  <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white dark:from-muted to-transparent pointer-events-none z-20" />
                  <Carousel
                    opts={{
                      align: 'start',
                      dragFree: true,
                      inViewThreshold: 0.5,
                      skipSnaps: true,
                    }}
                    className="w-full relative"
                  >
                    <CarouselContent className={cn('-ml-2 relative', 'transition-all duration-300 ease-out')}>
                      {selectedEntities.length > 0
                        ? selectedEntitiesObjects.map((selectedEntity) => (
                          <CarouselItem
                            key={selectedEntity.type === 'seat' ? selectedEntity.seat.id : selectedEntity.section.id}
                            className={cn(
                              'pl-2 basis-auto',
                              'animate-in fade-in-0 slide-in-from-left-5 duration-300'
                            )}
                          >
                            <Badge
                              className="flex items-center gap-2 px-3 py-1.5 border font-normal hover:no-underline 
                                  bg-gray-50 hover:bg-gray-100
                                  dark:bg-gray-800 dark:hover:bg-gray-700 
                                  dark:border-gray-600"
                              variant="outline"
                            >
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: selectedEntity.tierBackgroundColor,
                                  border: `1px solid ${selectedEntity.tierBorderColor}`,
                                }}
                              />
                              <span
                                className="whitespace-nowrap font-medium dark:text-gray-100"
                                style={{ color: selectedEntity.tierBorderColor }}
                              >
                                {formatEntityName(selectedEntity, entityIdToSectionName)}
                              </span>
                            </Badge>
                          </CarouselItem>
                        ))
                        : ticketTiers?.getTicketTiers.map((tier) => (
                          <CarouselItem
                            key={tier.id}
                            className={cn(
                              'pl-2 basis-auto',
                              'animate-in fade-in-0 slide-in-from-left-5 duration-300'
                            )}
                          >
                            <Badge
                              className="flex items-center gap-2 px-3 py-1.5 border font-normal hover:no-underline 
                                  bg-gray-50 hover:bg-gray-100
                                  dark:bg-gray-800 dark:hover:bg-gray-700 
                                  dark:border-gray-600"
                              variant="outline"
                            >
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: tier.metadata.background,
                                  border: `1px solid ${tier.metadata.border}`,
                                }}
                              />
                              <span
                                className="whitespace-nowrap font-medium dark:text-gray-100"
                                style={{ color: tier.metadata.border }}
                              >
                                {tier.name}
                              </span>
                              <span className="whitespace-nowrap text-foreground dark:text-gray-100">
                                {formatPrice(String(tier.price))}
                              </span>
                            </Badge>
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                  </Carousel>
                </div>

                <div className="bg-white dark:bg-muted">
                  <PricingBoxContainer eventId={event.id} />
                </div>
              </div>

              <DrawerContent className="h-[80vh]">
                <div className="flex flex-col h-full">
                  <div className="flex-1 min-h-0">
                    <div className="flex flex-col h-full mx-auto w-full max-w-md">
                      <div className="border-b flex-shrink-0">
                        <EventInfoRow
                          handle={event.handle}
                          image={getCoverPhoto()}
                          title={event.name}
                          start={event.startAt}
                          end={event.endAt}
                          address={event.address?.address || ''}
                          size="medium"
                          className="rounded-none border-none"
                        />
                      </div>
                      <div className="flex-1 overflow-y-auto pb-8">
                        {selectedEntities.length > 0 ? (
                          <SelectedSeatContainer event={event} />
                        ) : (
                          ticketTiers && <TicketTierInfoList items={getTierData()} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-muted sticky bottom-0 left-0 right-0 mt-auto">
                    <PricingBoxContainer eventId={event.id} />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          //  Desktop version
          <div className="flex flex-col w-full sm:w-96 mx-auto sm:border-r dark:border-t dark:sm:border-t-0 sm:h-full sm:max-h-none h-[50dvh] bg-muted dark:bg-transparent fixed bottom-0 sm:left-0 sm:top-14 sm:relative">
            <div className="flex flex-col h-full">
              <div className="border-b flex-shrink-0">
                <EventInfoRow
                  handle={event.handle}
                  image={getCoverPhoto()}
                  title={event.name}
                  start={event.startAt}
                  end={event.endAt}
                  address={event.address?.address || ''}
                  size="medium"
                  className="rounded-none border-none"
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {selectedEntities.length > 0 ? (
                  <SelectedSeatContainer event={event} />
                ) : (
                  ticketTiers && <TicketTierInfoList items={getTierData()} />
                )}
              </div>

              <div className="pb-4 bg-white dark:bg-transparent flex-shrink-0">
                <PricingBoxContainer eventId={event.id} />
              </div>
            </div>
          </div>
        )}

        {/* Right panel */}
        <div
          className={cn(
            'flex flex-col grow sm:flex-1 fixed w-full sm:relative top-16 items-center justify-center sm:h-auto',
            'transition-[height] duration-300 ease-in-out',
            subTotal !== '0' ? 'h-[calc(100dvh-265px)]' : 'h-[calc(100dvh-235px)]'
          )}
        >
          <TransformWrapper
            wheel={{ step: 0.9, smoothStep: 0.01 }}
            doubleClick={{ disabled: true }}
            panning={{ velocityDisabled: true }}
            ref={transformComponentRef}
            centerOnInit={true}
            minScale={0.6}
            initialScale={0.8}
            limitToBounds={false}
            alignmentAnimation={{ disabled: true }}
            onTransformed={(ref) => {
              const isShowSeatLabel = ref.state.scale >= 1.5;

              if (isShowSeatLabel !== showSeatLabelStateValue) {
                setShowSeatLabelState(isShowSeatLabel);
              }
            }}
            onInit={(ref) => {
              const initialScale = 0.8;
              setTimeout(() => {
                ref.centerView(initialScale);
              }, 500);
            }}
          >
            <div className="absolute top-5 right-5 z-10">
              <MapNavigator />
            </div>
            <TransformComponent
              wrapperClass="transformComponentWrapper"
              contentClass="transformComponentContent"
              wrapperStyle={{
                paddingBottom: '6rem',
              }}
            >
              <SeatMapContainer
                seatMap={seatMap}
                eventId={event?.id ?? ''}
                maxTicketPerOrder={event.maxTicketPerOrder ?? 0}
              />
            </TransformComponent>
          </TransformWrapper>

          {/* Legend */}
          {!isMobile && (
            <div className="flex gap-5 absolute bottom-10 md:bottom-4 bg-white dark:bg-muted mb-0 md:mb-4 py-2 px-3 rounded-lg border light:border-neutral-200">
              <div className="flex gap-4 items-center">
                <div className="flex flex-row items-center gap-2">
                  <div className="relative h-4 w-4 sm:w-5 sm:h-5 border-2 border-black dark:border-white rounded-full">
                    <CheckIcon
                      className="dark:stroke-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      size={'70%'}
                      strokeWidth={5}
                    />
                  </div>
                  <p className="text-xs sm:text-base">{formatMessage({ id: 'seatReservation.seatState.selected' })}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-4 w-4 sm:w-5 sm:h-5 rounded-full bg-neutral-300 dark:bg-neutral-700">
                    <SlashIcon
                      size={'45%'}
                      strokeWidth={4}
                      className="fill-neutral-400 stroke-neutral-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <p className="text-xs sm:text-base">
                    {formatMessage({ id: 'seatReservation.seatState.unavailable' })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isMobile && (
            <div
              onClick={() => {
                setShowLegend(!showLegend);
              }}
              className="hover:cursor-pointer flex gap-5 absolute right-2 bottom-[4.2rem] bg-white dark:bg-muted mb-0 md:mb-4 py-2 px-3 rounded-lg border light:border-neutral-200"
            >
              <div className="flex flex-col gap-2 items-start">
                <div className="flex flex-row items-center gap-2 justify-between w-full">
                  <p className="text-xs sm:text-base">{formatMessage({ id: 'seatReservation.legend' })}</p>
                  <ChevronUp
                    size={16}
                    className={`transform transition-transform duration-300 ${showLegend ? 'rotate-180' : ''}`}
                  />
                </div>

                {showLegend && <Separator />}
                {showLegend && (
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex h-4 w-4 sm:w-5 sm:h-5 border-2 border-black dark:border-white rounded-full items-center justify-center">
                      <CheckIcon className="dark:stroke-white" size={'70%'} strokeWidth={5} />
                    </div>
                    <p className="text-xs sm:text-base">
                      {formatMessage({ id: 'seatReservation.seatState.selected' })}
                    </p>
                  </div>
                )}

                {showLegend && (
                  <div className="flex items-center gap-2">
                    <div className="relative h-4 w-4 sm:w-5 sm:h-5 rounded-full bg-neutral-300 dark:bg-neutral-700">
                      <SlashIcon
                        size={'45%'}
                        strokeWidth={4}
                        className="fill-neutral-400 stroke-neutral-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>
                    <p className="text-xs sm:text-base">
                      {formatMessage({ id: 'seatReservation.seatState.unavailable' })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </FlipLayout>
  );
}

const MapNavigator = () => {
  const { zoomIn, zoomOut, centerView } = useControls();
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center justify-center w-8 h-8 hover:cursor-pointer bg-background border rounded-md border-neutral-300 outline-neutral-300"
        onClick={() => zoomIn()}
      >
        <PlusIcon size={16} className="fill-neutral-950" />
      </div>

      <div
        className="flex items-center justify-center w-8 h-8 hover:cursor-pointer bg-background border rounded-md border-neutral-300 outline-neutral-300"
        onClick={() => zoomOut()}
      >
        <MinusIcon size={16} className="fill-neutral-950" />
      </div>

      <div
        className="flex items-center justify-center w-8 h-8 hover:cursor-pointer bg-background border rounded-md border-neutral-300 outline-neutral-300"
        onClick={() => centerView(0.8)}
      >
        <RefreshCcwIcon size={16} />
      </div>
    </div>
  );
};
