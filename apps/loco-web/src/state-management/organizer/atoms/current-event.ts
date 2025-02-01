import { localStorageEffect } from '@/state-management/utils/localStorageEffect';
import { atom } from 'recoil';

export const currentEventState = atom<{
  id: string;
  name: string;
  imageURL: string | undefined | null;
  startAt: string;
  endAt: string;
} | null>({
  key: 'currentEvent',
  default: null,
  effects: [localStorageEffect('current_event', 'object')],
});
