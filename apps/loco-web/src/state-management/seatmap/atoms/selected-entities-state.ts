import { atomFamily } from 'recoil';

export const selectedEntitiesState = atomFamily<string[], string>({
  key: 'SelectedEntitiesIds',
  default: [],
});
