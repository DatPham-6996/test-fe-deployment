import { formatPrice } from '@/lib/utils/format';
import classnames from 'classnames';
import { TicketIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import FlipBadge from '../badge';

export type TicketPriceItem = {
  label: string;
  value: string;
  price: string;
  quantity: number;
};

type TicketPriceItemProps = TicketPriceItem & {
  active?: boolean;
  onClick: (value: TicketPriceItem) => void;
};

export function PriceItem({ label, value, price, active, quantity = 0, onClick }: TicketPriceItemProps) {
  const isEmpty = quantity <= 0;
  const { formatMessage } = useIntl();
  return (
    <div
      className={classnames('flex gap-2 items-center p-3 bg-muted border rounded-lg relative hover:cursor-pointer', {
        border: active,
        'border-1 border-primary': active,
        'text-muted-foreground': isEmpty,
      })}
      onClick={!isEmpty ? () => onClick({ label, value, price, quantity }) : undefined}
    >
      <TicketIcon
        size={24}
        className={classnames({
          '!fill-muted': isEmpty,
          'stroke-1': true,
        })}
      />
      <div className="flex justify-between flex-1">
        <div className="flex items-center gap-2">
          <p className="font-normal">{label}</p>
          {isEmpty && <FlipBadge variant="destructive">{formatMessage({ id: 'orderDetails.soldOut' })}</FlipBadge>}
        </div>
        <div>
          <p className="font-medium ">{formatPrice(price)}</p>
        </div>
      </div>
    </div>
  );
}
