import { InfoStar } from '@/components/icon';
import { Button } from '@/components/shadcn/ui/button';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils/format';
import { useSeatReservationCheckOut } from '@/state-management/hooks/useSeatReservationCheckOut';
import { totalPriceSelector } from '@/state-management/price/selectors/total-price-selector';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';
import { selectedSeatsState } from '@/state-management/seatmap/atoms/selected-seats-state';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';

type PricingBoxContainerProps = {
  eventId: string;
};

export default function PricingBoxContainer({ eventId }: PricingBoxContainerProps) {
  const subTotal = useRecoilValue(totalPriceSelector(eventId));
  const selectedEntities = useRecoilValue(selectedEntitiesState(eventId));
  const selectedSeats = useRecoilValue(selectedSeatsState(eventId));
  const { toCheckout } = useSeatReservationCheckOut();
  const [submitting, setSubmitting] = useState(false);
  const { formatMessage } = useIntl();

  const onClick = () => {
    // Check if selected seats are good seats
    // console.log('selectedEntities', selectedEntities);
    // console.log('selectedSeats', selectedSeats);
    // return;
    toCheckout(selectedEntities, selectedSeats, eventId, setSubmitting);
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col gap-2 p-3">
        {subTotal === '0' && (
          <div className="flex items-center gap-2">
            <InfoStar className="fill-neutral-950 dark:fill-white" />
            <p className="text-base font-medium">{formatMessage({ id: 'checkout.reservation.selectSeatNote' })}</p>
          </div>
        )}
        <div
          className={cn(
            'overflow-hidden transition-[height] duration-300 ease-in-out',
            subTotal !== '0' ? 'h-[32px]' : 'h-0'
          )}
        >
          <div className="flex items-baseline justify-between pl-1">
            <p className="font-light text-sm">{formatMessage({ id: 'reservation.pricingBox.subtotal' })}</p>
            <p className="font-bold text-lg">{formatPrice(subTotal)}</p>
          </div>
        </div>
        <div className="flex items-center w-full">
          <Button
            disabled={selectedEntities.length === 0}
            className={classNames('w-full')}
            onClick={onClick}
            loading={submitting}
          >
            {formatMessage({ id: 'reservation.pricingBox.continue' })}
          </Button>
        </div>
      </div>
    </div>
  );
}
