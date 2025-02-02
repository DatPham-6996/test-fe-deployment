import { formatPrice } from '@/lib/utils/format';
import { TicketIcon, TimerIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Card, CardBody, CardHeader } from '../card';
import { Button } from '../shadcn/ui/button';
import { Separator } from '../shadcn/ui/separator';

type SeatReservationProps = {
  eventId: string;
  handle: string;
  minPrice?: number;
  maxPrice?: number;
  isOnSale?: boolean;
  isUpcoming?: boolean;
};

export function TicketCardSeatReservation({
  eventId,
  handle,
  minPrice,
  maxPrice,
  isOnSale = false,
  isUpcoming = false,
}: SeatReservationProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const [submitting, setSubmitting] = useState(false);
  const onClick = () => {
    setSubmitting(true);
    router.push(`/reservation/${handle}`);
  };

  return (
    <Card>
      <CardHeader title={formatMessage({ id: 'eventDetail.ticket' })} icon={<TicketIcon size={18} />} />

      <Separator orientation="horizontal" />
      <CardBody>
        <div className="mt-4 flex flex-col gap-4">
          {isOnSale && (
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center rounded-lg w-10 h-10 border border-neutral-200">
                <TimerIcon size={18} />
              </div>
              <div className="flex flex-col">
                <p>{formatMessage({ id: 'eventDetail.limitSeats' })}</p>
                <p className="text-muted-foreground text-sm">{formatMessage({ id: 'eventDetail.hurryNiceSeat' })}</p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <p>{formatMessage({ id: 'ticketCard.priceFrom' })}</p>

            <div className="flex gap-3">
              <p className="text-lg font-bold">{minPrice && formatPrice(minPrice.toString())}</p>
              <p className="text-lg font-bold">-</p>
              <p className="text-lg font-bold">{maxPrice && formatPrice(maxPrice.toString())}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={onClick} className="w-full" disabled={!isOnSale} loading={submitting}>
            {isOnSale
              ? formatMessage({ id: 'ticketCard.reserve' })
              : isUpcoming
                ? formatMessage({ id: 'eventDetail.upcoming' })
                : formatMessage({ id: 'eventDetail.offsale' })}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
