import { entityIdToTierIdState } from '@/state-management/seatmap/atoms/entity-id-to-tier-id-state';
import { selectorFamily } from 'recoil';
import { tiersState } from '../../seatmap/atoms/all-tiers-state';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';

export const totalPriceSelector = selectorFamily({
  key: 'TotalPriceSelector',
  get:
    (eventId: string) =>
    ({ get }) => {
      const entitiesIds = get(selectedEntitiesState(eventId));
      const tiers = get(tiersState(eventId));
      const entityIdToTierId = get(entityIdToTierIdState(eventId));

      const selectedTiers: any[] = [];
      for (const entityId of entitiesIds) {
        const tierId = entityIdToTierId.get(entityId);
        const tier = tiers.get(tierId ?? '');
        selectedTiers.push(tier);
      }
      const totalPrice = selectedTiers.reduce((acc, tier) => acc + tier.price, 0);

      return String(totalPrice);
    },
});
