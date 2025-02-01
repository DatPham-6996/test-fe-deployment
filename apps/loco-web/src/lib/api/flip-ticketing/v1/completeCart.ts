import type { StoreCompleteCartRes } from '@medusajs/medusa';
import { getTicketingAgentWithIdempotencyKey } from '../../agents/ticketing-agent';

export const postCompleteCart = async (idempotencyKey: string, cartId: string): Promise<StoreCompleteCartRes> => {
  const ticketingAgentWithAuth = await getTicketingAgentWithIdempotencyKey(idempotencyKey);
  const res = await ticketingAgentWithAuth.post(`/store/carts/${cartId}/complete`);
  return res.data;
};
