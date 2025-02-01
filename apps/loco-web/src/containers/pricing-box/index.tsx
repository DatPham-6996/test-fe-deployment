import { InfoStar } from '@/components/icon';
import { LongOperationButton } from '@/components/button/long-operation-button';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils/format';
import { useSeatReservationCheckOut } from '@/state-management/hooks/useSeatReservationCheckOut';
import { totalPriceSelector } from '@/state-management/price/selectors/total-price-selector';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';
import { selectedSeatsState } from '@/state-management/seatmap/atoms/selected-seats-state';
import classNames from 'classnames';
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
  const { formatMessage } = useIntl();

  const handleReservation = async () => {
    await toCheckout(selectedEntities, selectedSeats, eventId);
  };

  const dialogContent = {
    initial: {
      title: formatMessage({ id: 'seatReservation.confirmLoading.initial.title' }),
      message: formatMessage({ id: 'seatReservation.confirmLoading.initial.message' }),
      subtitle: formatMessage({ id: 'seatReservation.confirmLoading.initial.subtitle' }),
    },
    error: {
      title: formatMessage({ id: 'seatReservation.confirmLoading.error.title' }),
      message: formatMessage({ id: 'seatReservation.confirmLoading.error.message' }),
      retry: formatMessage({ id: 'seatReservation.confirmLoading.error.retry' }),
    },
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
          <LongOperationButton
            operation={handleReservation}
            disabled={selectedEntities.length === 0}
            className={classNames('w-full')}
            dialogContent={dialogContent}
            timeoutDuration={30000} // 30 seconds timeout
            initialDelay={3000} // Only show after 3 seconds
          >
            {formatMessage({ id: 'reservation.pricingBox.continue' })}
          </LongOperationButton>
        </div>
      </div>
    </div>
  );
}
