import { localStorageEffect } from '@/state-management/utils/localStorageEffect';
import { atom } from 'recoil';

export const currentOrgState = atom<{ id: string; name: string; logoURL: string | null | undefined } | null>({
  key: 'currentOrganization',
  default: null,
  effects: [localStorageEffect('current_organization', 'object')],
});
