import { getTicketingAgentWithAuth } from '../../agents/ticketing-agent';

type RequestParams = {
  id: string;
};

type IdempotencyKeyResponse = {
  idempotency_key: string;
  request_method: string;
  request_params: RequestParams;
  request_path: string;
  id: string;
  locked_at: null | string; // Assuming this can be a string date or null
  response_code: null | number; // Assuming this can be a number or null
  response_body: null | string; // Assuming this can be a string or null (adjust if the structure is more complex)
  created_at: string;
  recovery_point: string;
};

export const postIdempotencyKeyForCartComplete = async (cartId: string): Promise<IdempotencyKeyResponse> => {
  const ticketingAgentWithAuth = await getTicketingAgentWithAuth();
  const res = await ticketingAgentWithAuth.post('/store/idempotency-keys', {
    method: 'POST',
    params: {
      id: cartId,
    },
    path: `/store/carts/${cartId}/complete`,
  });
  return res.data;
};
