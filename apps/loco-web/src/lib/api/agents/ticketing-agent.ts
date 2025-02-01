import axios from 'axios';
import { createAxiosWithToken } from '../axios';

export const ticketingAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TICKETING_PATH,
});

export const getTicketingAgentWithAuth = async () => {
  return await createAxiosWithToken({
    baseURL: process.env.NEXT_PUBLIC_TICKETING_PATH,
  });
};

export const getTicketingAgentWithIdempotencyKey = async (idempotencyKey: string) => {
  return await createAxiosWithToken({
    baseURL: process.env.NEXT_PUBLIC_TICKETING_PATH,
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
  });
};
