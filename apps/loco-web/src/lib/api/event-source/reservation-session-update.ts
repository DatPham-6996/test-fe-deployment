export const getReservationSessionUpdateEventSource = (params: { eventId: string; userId: string }) => {
  const { eventId, userId } = params;
  return new EventSource(
    `${process.env.NEXT_PUBLIC_EVENT_PATH}/reservation-session?userId=${userId}&eventId=${eventId}`
  );
};
