import { atomFamily } from 'recoil';

export const selectedSeatsState = atomFamily<Set<string>, string>({
  key: 'SelectedSeatIds',
  default: new Set<string>(),
});
