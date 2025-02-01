import type { StoreCartsRes } from '@medusajs/medusa';
import { getTicketingAgentWithAuth } from '../../agents/ticketing-agent';

export const postApplyDiscount = async (cartId: string, discountCode: string): Promise<StoreCartsRes> => {
  const ticketingAgentWithAuth = await getTicketingAgentWithAuth();
  const res = await ticketingAgentWithAuth.post(`/store/carts/${cartId}/discounts`, {
    discounts: [
      {
        code: discountCode,
      },
    ],
  });
  return res.data;
};

export const postRemoveDiscount = async (cartId: string): Promise<StoreCartsRes> => {
  const ticketingAgentWithAuth = await getTicketingAgentWithAuth();
  const res = await ticketingAgentWithAuth.post(`/store/carts/${cartId}/discounts`, {
    discounts: [],
  });
  return res.data;
};
