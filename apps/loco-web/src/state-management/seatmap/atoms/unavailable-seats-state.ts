import { atomFamily } from 'recoil';

export const unavailableSeatsState = atomFamily<Set<string>, string>({
  key: 'UnavailableSeatsState',
  default: new Set(),
});
