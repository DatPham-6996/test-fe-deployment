import { atomFamily } from 'recoil';

export const gaSectionInventoryState = atomFamily<Map<string, number>, string>({
  key: 'GASectionInventoryState',
  default: new Map(),
});
