import { Button } from '@/components/shadcn/ui/button';
import { formatPrice } from '@/lib/utils/format';
import { toastWarn } from '@/lib/utils/toast';
import { Tier } from '@/state-management/seatmap/atoms/all-tiers-state';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Markdown from 'react-markdown';

interface GASectionQuantitySelectorProps {
  sectionInfo: {
    id: string;
    tierId: string;
  };
  maxTicketPerOrder: number;
  currentSelectedCount: number;
  tier: Tier;
  sectionName: string;
  onAdd: (sectionInfo: { id: string; tierId: string }, quantity: number) => void;
  sectionInventory?: number;
}

export const GASectionQuantitySelector = ({
  sectionInfo,
  maxTicketPerOrder,
  currentSelectedCount,
  tier,
  sectionName,
  onAdd,
  sectionInventory,
}: GASectionQuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(1);
  const { formatMessage } = useIntl();
  const price = tier.price;

  const remainingSlots = maxTicketPerOrder - currentSelectedCount;

  const handleQuantityDecrease = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleQuantityIncrease = () => {
    if (remainingSlots === 0) return;

    if (typeof sectionInventory !== 'number') {
      setQuantity(Math.min(remainingSlots, quantity + 1));
      return;
    }

    if (quantity >= sectionInventory) {
      toastWarn(formatMessage({ id: 'eventDetail.ticketAvailableExceeded' }));
      return;
    }

    setQuantity(Math.min(remainingSlots, Math.min(sectionInventory, quantity + 1)));
  };

  const handleAdd = () => {
    onAdd(sectionInfo, quantity);
  };

  const isDisabled =
    remainingSlots === 0 ||
    quantity > remainingSlots ||
    (typeof sectionInventory === 'number' && quantity > sectionInventory);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 border-b pb-4">
          <span className="text-sm font-normal">{formatMessage({ id: 'seatReservation.section' }).toUpperCase()}</span>
          <h2 className="text-xl font-bold">{sectionName.toUpperCase() || tier.name.toUpperCase()}</h2>
          {/* Tier description */}

          <Markdown>{tier.description}</Markdown>
        </div>

        <p className="text-sm font-normal">{formatMessage({ id: 'seatReservation.ticketTier' })}</p>

        {/* Tier info and quantity selector row */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full" style={{ backgroundColor: tier.metadata.border }} />
              <span className="font-medium" style={{ color: tier.metadata.border }}>
                {tier.name.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              onClick={handleQuantityDecrease}
              className={`flex h-8 w-8 items-center justify-center rounded-md border-2 
                ${quantity === 1 ? 'cursor-not-allowed opacity-50' : 'hover:cursor-pointer'}`}
            >
              <MinusIcon size={16} />
            </div>

            <div className="flex w-8 items-center justify-center font-semibold">{quantity}</div>

            <div
              onClick={handleQuantityIncrease}
              className={`flex h-8 w-8 items-center justify-center rounded-md border-2
                ${quantity >= remainingSlots || (typeof sectionInventory === 'number' && quantity >= sectionInventory)
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:cursor-pointer'
                }`}
            >
              <PlusIcon size={16} />
            </div>
          </div>
        </div>

        {tier.metadata?.description && (
          <div className="w-full">
            <div className="w-full text-sm text-gray-600 line-clamp-2 overflow-hidden text-ellipsis whitespace-normal break-all">
              {tier.metadata.description}
            </div>
          </div>
        )}

        {/* Total row */}
        <div className="flex justify-between items-center border-t pt-4 mt-1">
          <span className="font-medium">{formatMessage({ id: 'orderDetails.total' })}</span>
          <span className="text-lg font-semibold">{formatPrice(String(price * quantity))}</span>
        </div>

        {/* Add Button */}
        <div className="mt-1">
          <Button onClick={handleAdd} className="w-full" disabled={isDisabled}>
            {formatMessage({ id: 'common.add' })}
          </Button>
        </div>
      </div>
    </div>
  );
};
