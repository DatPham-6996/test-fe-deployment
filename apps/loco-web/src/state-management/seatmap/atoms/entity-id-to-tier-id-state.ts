import { atomFamily } from 'recoil';

export const entityIdToTierIdState = atomFamily<Map<string, string>, string>({
  key: 'EntityIdToTierIdState',
  default: new Map<string, string>(),
});
