import { SeatClearanceAlert } from '@/components/alert/SeatClearanceAlert';
import SelectedEntityItem from '@/components/seat-item';
import { EventDetailsQuery } from '@/lib/__generated__/graphql';
import { selectedSeatsState } from '@/state-management/seatmap/atoms/selected-seats-state';
import { selectedEntitiesSelector } from '@/state-management/seatmap/selectors/selected-seats-selector';
import { useIntl } from 'react-intl';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cn } from '@/lib/utils';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';

export const SelectedSeatContainer = ({ event }: { event: EventDetailsQuery['event'] }) => {
  const items = useRecoilValue(selectedEntitiesSelector(event.id));
  const [selectedSeats, setSelectedSeats] = useRecoilState(selectedSeatsState(event.id));
  const [selectedEntities, setSelectedEntities] = useRecoilState(selectedEntitiesState(event.id));
  const { formatMessage } = useIntl();

  const removeEntities = (entityIdToRemove: string) => {
    const updatedEntities = selectedEntities.filter((entityId) => entityId !== entityIdToRemove);
    setSelectedEntities(updatedEntities);

    if (selectedSeats.has(entityIdToRemove)) {
      const updatedSeats = Array.from(selectedSeats).filter((seatId) => seatId !== entityIdToRemove);
      setSelectedSeats(new Set(updatedSeats));
    }
  };

  const removeAllTickets = () => {
    setSelectedSeats(new Set());
    setSelectedEntities([]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row items-center ml-4 mr-1 py-2 sticky top-0 z-10">
        <p className="font-medium text-base grow">
          {selectedEntities.length} {formatMessage({ id: 'seatReservation.ticketsAreBeingSelected' })}
        </p>
        <SeatClearanceAlert onConfirm={removeAllTickets} />
      </div>
      <div
        className={cn(
          'flex flex-col gap-3 pl-4 pr-3 py-2',
          'overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent',
          'transition-all duration-300 ease-out',
          'overflow-y-scroll'
        )}
      >
        {items.map((item, index) => {
          const entityId = item.type === 'seat' ? item.seat.id : item.section.id;

          return (
            <SelectedEntityItem
              type={item.type}
              key={entityId}
              sectionId={item?.section?.id ?? ''}
              sectionName={item?.sectionName ?? ''}
              seatId={item?.seat?.id ?? ''}
              seatPosition={item?.seat?.position ?? ''}
              seatSection={item?.seat?.section ?? ''}
              seatRow={item?.seat?.row ?? ''}
              tierName={item.tierName}
              unitPrice={item.unitPrice}
              tierBackgroundColor={item.tierBackgroundColor}
              tierBorderColor={item.tierBorderColor}
              itemDetails={item.itemDetails}
              onRemove={() => removeEntities(entityId)}
            />
          );
        })}
      </div>
    </div>
  );
};
