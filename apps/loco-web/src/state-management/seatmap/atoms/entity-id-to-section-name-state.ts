import { atomFamily } from 'recoil';

export const entityIdToSectionNameState = atomFamily<Map<string, string>, string>({
  key: 'EntityIdToSectionNameState',
  default: new Map<string, string>(),
});
