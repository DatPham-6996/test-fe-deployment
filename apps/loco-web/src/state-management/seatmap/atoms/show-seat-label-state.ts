import { atomFamily } from 'recoil';

export const showSeatLabelState = atomFamily<boolean, string>({
  key: 'ShowSeatLabelState',
  default: false,
});
