import { atomFamily } from 'recoil';

export interface Tier {
  id: string;
  name: string;
  description?: string | null | undefined;
  price: number;
  isVisible: boolean;
  saleStartAt: any;
  saleEndAt: any;
  initialInventory: number;
  totalSold: number;
  reservingQuantity: number;
  metadata?: any | null;
}

export const tiersState = atomFamily<Map<string, Tier>, string>({
  key: 'TiersState',
  default: new Map(),
});
