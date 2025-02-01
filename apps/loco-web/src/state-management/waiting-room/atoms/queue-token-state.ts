import { atom, atomFamily } from 'recoil';

export interface QueueToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export const queueTokenState = atomFamily<QueueToken | null, string>({
  key: 'QueueTokenState',
  default: null,
});
