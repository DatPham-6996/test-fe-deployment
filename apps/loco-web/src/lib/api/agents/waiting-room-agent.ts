import axios from 'axios';
import { createAxiosWithToken } from '../axios';

export const waitingRoomAgent = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WAITING_ROOM_PATH,
});

export const getWaitingRoomAgentWithAuth = async () => {
  return await createAxiosWithToken({
    baseURL: process.env.NEXT_PUBLIC_WAITING_ROOM_PATH,
  });
};
