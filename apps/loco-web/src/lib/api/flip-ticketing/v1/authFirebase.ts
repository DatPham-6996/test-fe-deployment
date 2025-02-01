import { AxiosResponse } from 'axios';
import { ticketingAgent } from '../../agents/ticketing-agent';

export const authWithFirebase = async (token: string) => {
  const res: AxiosResponse = await ticketingAgent.get('/store/auth/firebase', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
