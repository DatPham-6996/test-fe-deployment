'use client';

import { Card, CardBody, CardHeader } from '@/components/card';
import { QuantitySelector } from '@/components/quantity-selector';
import { Button } from '@/components/shadcn/ui/button';
import { Separator } from '@/components/shadcn/ui/separator';
import { TicketPriceItems } from '@/components/ticket-price-items';
import { TicketPriceItem } from '@/components/ticket-price-items/PriceItem';
import { useGetTicketTiersSuspenseQuery } from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { formatPrice } from '@/lib/utils/format';
import { useGeneralAdmissionCheckout } from '@/state-management/hooks/useGeneralAdmissionCheckOut';
import { StickerIcon, TicketIcon, TimerIcon } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';

export type TicketPriceItemWithCount = TicketPriceItem & {
  count: number;
};

type GeneralAdmissionProps = {
  eventId: string;
  maxTicketQuantity?: number;
  isOnSale?: boolean;
  isUpcoming?: boolean;
};

export function GeneralAdmissionTicketCardContainer({
  eventId,
  maxTicketQuantity = 10,
  isOnSale = false,
  isUpcoming = false,
}: GeneralAdmissionProps) {
  const { formatMessage } = useIntl();
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const { data } = useGetTicketTiersSuspenseQuery({ variables: { data: { eventId: eventId } } });
  const { toCheckout } = useGeneralAdmissionCheckout();
  const { logEvent } = useLogEvent();

  const onCheckOutClick = async (selectedPriceItem: TicketPriceItemWithCount | null) => {
    const selectedItems = selectedPriceItem
      ? [
        {
          value: selectedPriceItem.value,
          quantity: selectedPriceItem.count,
        },
      ]
      : null;

    logEvent({
      eventName: 'select_ticket_tier',
      metadata: { selectedItems: JSON.stringify(selectedItems) },
      eventID: eventId
    });

    toCheckout(selectedItems, setSubmitting);
  };

  const ticketTiers = data?.getTicketTiers ?? [];

  const ticketOptions = ticketTiers.map((ticketTier) => {
    return {
      label: ticketTier.name,
      value: ticketTier.id,
      price: String(ticketTier.price),
      quantity: ticketTier.initialInventory - ticketTier.totalSold - ticketTier.reservingQuantity,
    };
  });

  const [selectedTier, setSelectedTier] = useState<TicketPriceItem>();

  useEffect(() => {
    if (ticketOptions && ticketOptions.length > 0 && !selectedTier) {
      for (let i = 0; i < ticketOptions.length; i++) {
        if (ticketOptions[i].quantity > 0) {
          setSelectedTier(ticketOptions[i]);
          break;
        }
      }
    }
  }, [ticketOptions, selectedTier]);

  const onSubmit = () => {
    const newSelectedTier = (selectedTier || {}) as TicketPriceItem;

    setSubmitting(true);
    onCheckOutClick({ ...newSelectedTier, count: quantity });
  };

  const isEmpty = ticketOptions && ticketOptions.length === 0;
  const subTotal = Number(selectedTier?.price) * quantity;

  const renderTicketTiers = (
    <>
      <div className="mt-2">
        <div className="flex items-center rounded-lg p-2 gap-3">
          <div className="flex justify-center items-center rounded-lg w-10 h-10 border border-neutral-200">
            <TimerIcon size={18} />
          </div>
          <div className="flex flex-col">
            <p>{formatMessage({ id: 'eventDetail.limitSeats' })}</p>
            <p className="text-muted-foreground text-sm">{formatMessage({ id: 'eventDetail.hurryNiceSeat' })}</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center bg-secondary rounded-lg p-5 gap-3">
          <div className="flex items-center gap-2">
            <p className="font-medium">{formatMessage({ id: 'eventDetail.selectSeats' })}</p>
          </div>

          {selectedTier && selectedTier.quantity > 0 && (
            <QuantitySelector
              onChange={setQuantity}
              availableQuantity={selectedTier.quantity}
              maxQuantity={maxTicketQuantity}
            />
          )}
        </div>
      </div>

      <div className="mt-3">
        {ticketOptions && ticketOptions.length ? (
          <div className="flex flex-col gap-3">
            <TicketPriceItems
              onSelect={setSelectedTier}
              options={ticketOptions}
              selectedValue={selectedTier?.value ?? ''}
            />
            <div className="flex justify-between items-center px-2">
              <p className="text-lg font-normal">{formatMessage({ id: 'eventDetail.subTotal' })}</p>
              <p className="text-lg font-bold">{formatPrice(String(subTotal))}</p>
            </div>
          </div>
        ) : null}
        <div className="mt-4">
          <Button
            loading={submitting}
            onClick={onSubmit}
            className="w-full"
            size={'lg'}
            disabled={!isOnSale || !selectedTier}
          >
            {isOnSale
              ? formatMessage({ id: 'eventDetail.bookTicket' })
              : isUpcoming
                ? formatMessage({ id: 'eventDetail.upcoming' })
                : formatMessage({ id: 'eventDetail.offsale' })}
          </Button>
        </div>
      </div>
    </>
  );

  const renderEmptyTicketTiers = (
    <div className="flex flex-col justify-center items-center py-7 gap-5">
      <StickerIcon size={100} strokeWidth={1} />
      <div>
        <p className="text-xl font-bold">{formatMessage({ id: 'eventDetail.noTierInformation' })}</p>
      </div>
    </div>
  );

  const renderLoading = () => {
    return (
      <div className="flex flex-col justify-center items-center py-7 gap-5">
        <ClipLoader />
      </div>
    );
  };

  return (
    <Card>
      <CardHeader title={formatMessage({ id: 'eventDetail.ticket' })} icon={<TicketIcon size={18} />} />
      <Separator orientation="horizontal" />
      <Suspense fallback={renderLoading()}>
        <CardBody>
          {!isEmpty && renderTicketTiers}
          {isEmpty && renderEmptyTicketTiers}
        </CardBody>
      </Suspense>
    </Card>
  );
}
