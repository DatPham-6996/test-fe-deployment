import { getTicketingAgentWithAuth } from '../../agents/ticketing-agent';

export const getOrCreateSeatAndSectionVariantIds = async (
  eventId: string,
  seatIds: string[],
  gaSectionIds: string[]
): Promise<string[]> => {
  const ticketingAgentWithAuth = await getTicketingAgentWithAuth();
  await ticketingAgentWithAuth.post(`/store/seats/product-variants`, {
    eventId,
    seatIds,
    gaSectionIds: Array.from(new Set(gaSectionIds)),
  });

  return [...seatIds, ...gaSectionIds].map((entityId) => `${eventId}-${entityId}`);
};
