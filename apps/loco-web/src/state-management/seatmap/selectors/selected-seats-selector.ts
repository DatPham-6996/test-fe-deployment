import { SeatDisplay, SectionDisplay } from '@/lib/types';
import { displaySeatId, displaySectionId } from '@/lib/utils/seatmap';
import { selectorFamily } from 'recoil';
import { tiersState } from '../atoms/all-tiers-state';
import { entityIdToSectionNameState } from '../atoms/entity-id-to-section-name-state';
import { entityIdToTierIdState } from '../atoms/entity-id-to-tier-id-state';
import { selectedEntitiesState } from '../atoms/selected-entities-state';
import { selectedSeatsState } from '../atoms/selected-seats-state';

type SelectedSeat = {
  type: 'seat';
  section: null;
  seat: SeatDisplay;
  tierName: string;
  sectionName: string;
  unitPrice: string;
  itemDetails: string;
  tierBackgroundColor: string;
  tierBorderColor: string;
  tierId: string;
};

type SelectedSection = {
  type: 'section';
  section: SectionDisplay;
  seat: null;
  tierName: string;
  sectionName: string;
  unitPrice: string;
  itemDetails: string;
  tierBackgroundColor: string;
  tierBorderColor: string;
  tierId: string;
};

export type SelectedSeatOrSection = SelectedSeat | SelectedSection;

export const selectedEntitiesSelector = selectorFamily<SelectedSeatOrSection[], string>({
  key: 'SelectedEntitiesSelector',
  get:
    (eventId: string) =>
    ({ get }) => {
      const entitiesIds = get(selectedEntitiesState(eventId));
      const selectedSeatIds = get(selectedSeatsState(eventId));
      const tiers = get(tiersState(eventId));
      const entityIdToTierId = get(entityIdToTierIdState(eventId));
      const entityIdToSectionName = get(entityIdToSectionNameState(eventId));

      const result: SelectedSeatOrSection[] = [];

      for (let entityId of entitiesIds) {
        const tierId = entityIdToTierId.get(entityId);
        if (!tierId) {
          continue;
        }

        const tier = tiers.get(tierId);
        if (!tier) {
          continue;
        }

        if (selectedSeatIds.has(entityId)) {
          result.unshift({
            type: 'seat',
            section: null,
            seat: displaySeatId(entityId),
            sectionName: entityIdToSectionName.get(entityId) ?? '',
            tierName: tier.name,
            unitPrice: String(tier.price),
            itemDetails: tier.metadata?.description || '', // TODO: Add tier description
            tierBackgroundColor: tier.metadata.background,
            tierBorderColor: tier.metadata.border,
            tierId: tierId,
          });
        } else {
          result.unshift({
            type: 'section',
            section: displaySectionId(entityId),
            seat: null,
            sectionName: entityIdToSectionName.get(entityId) ?? '',
            tierName: tier.name,
            unitPrice: String(tier.price),
            itemDetails: tier.metadata?.description || '', // TODO: Add tier description
            tierBackgroundColor: tier.metadata.background,
            tierBorderColor: tier.metadata.border,
            tierId: tierId,
          });
        }
      }

      return result;
    },
});
