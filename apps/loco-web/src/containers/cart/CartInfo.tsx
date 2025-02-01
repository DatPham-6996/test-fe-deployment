import { CardHeader } from '@/components/card';
import { Separator } from '@/components/shadcn/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/ui/tooltip';
import { useGetTicketTiersSuspenseQuery } from '@/lib/__generated__/graphql';
import { formatPrice } from '@/lib/utils/format';
import { displaySeatId } from '@/lib/utils/seatmap';
import { type Cart } from '@medusajs/medusa';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';
import AnimatedPrice from './AnimatedPrice';
import DiscountBox from './DiscountBox';

export default function CartInfo({
  cart,
  loadingCart,
  successCart,
  hasSeatMap,
  eventId,
  organizationId,
  refetchCart,
}: {
  cart: Cart;
  loadingCart: boolean;
  successCart: boolean;
  hasSeatMap: boolean;
  eventId: string;
  organizationId: string;
  refetchCart: () => void;
}): JSX.Element {
  const intl = useIntl();
  const ticketTiersQuery = useGetTicketTiersSuspenseQuery({
    variables: {
      data: { eventId },
    },
  });
  const ticketTiers = ticketTiersQuery?.data?.getTicketTiers;
  const discountTotal = cart?.discount_total || 0;
  const hasDiscount = cart?.discounts && cart?.discounts.length > 0;
  const prevMyPropRef = useRef<Cart>();
  const [previousPrice, setPreviousPrice] = useState(cart?.total || 0);
  const currentPrice = cart?.total || 0;

  useEffect(() => {
    if (!cart || loadingCart) {
      return;
    }

    if (prevMyPropRef.current !== undefined && prevMyPropRef.current !== cart) {
      setPreviousPrice(prevMyPropRef.current?.total ?? 0);
    }

    // Update the ref with the current value after comparison
    prevMyPropRef.current = cart;
  }, [cart, loadingCart]);

  if (loadingCart || !ticketTiersQuery)
    return (
      <div className="flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  if (!successCart) return <></>;

  const TicketColumnItem = (label: string, value: string, className?: string) => {
    return (
      <div className={classNames('flex flex-col', className)}>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-foreground text-lg font-medium truncate max-w-[100%]">{value}</p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  const GeneralAdmissionCartItems = () => {
    return (
      <div className="flex flex-col divide-y">
        {cart.items.map((item) => {
          const variant = item.variant;
          if (!variant) {
            return null;
          }

          console.log({ item });

          return (
            <>
              {[...Array(item.quantity)].map((_, index) => (
                <div key={`${variant.id}-${index}`} className="flex flex-col pb-3 pt-1">
                  <div className="flex flex-row gap-1 justify-between mt-2">
                    {ticketTiers &&
                      TicketColumnItem(
                        intl.formatMessage({ id: 'ticket.ticketType' }),
                        variant.title,
                        'items-start flex-grow'
                      )}
                  </div>
                </div>
              ))}
            </>
          );
        })}
      </div>
    );
  };

  function SeatReservationCartItems() {
    return (
      <div className="flex flex-col divide-y">
        {cart.items.map((item) => {
          const variant = item.variant;
          if (!variant) {
            return null;
          }

          if (variant.metadata.type === 'GENERAL_ADMISSION') {
            return (
              <>
                {[...Array(item.quantity)].map((_, index) => (
                  <div key={`${variant.id}-${index}`} className="flex flex-col pb-3 pt-1">
                    <div className="flex flex-row gap-1 justify-between mt-2">
                      {ticketTiers &&
                        TicketColumnItem(
                          intl.formatMessage({ id: 'ticket.ticketType' }),
                          ticketTiers.find(
                            (tier) =>
                              tier.id === item.variant.metadata.seatTier ||
                              tier.id === item.variant.metadata.sectionTier ||
                              tier.id === item.variant.metadata.tierId
                          )?.name || '',
                          'items-start flex-grow max-w-24'
                        )}

                      {TicketColumnItem(
                        `${intl.formatMessage({ id: 'seatReservation.section' }).toUpperCase()} (${intl.formatMessage({
                          id: 'seatReservation.generalAdmission',
                        })})`,
                        variant.metadata.sectionName || '-',
                        'items-center'
                      )}
                    </div>
                  </div>
                ))}
              </>
            );
          }

          const seatDisplay = displaySeatId(variant.metadata.seatId);

          return (
            <div key={variant.metadata.seatId} className="flex flex-col pb-3 pt-1">
              <div className="flex flex-row gap-1 place-content-between mt-2">
                {ticketTiers &&
                  TicketColumnItem(
                    intl.formatMessage({ id: 'ticket.ticketType' }),
                    ticketTiers.find(
                      (tier) =>
                        tier.id === item.variant.metadata.seatTier ||
                        tier.id === item.variant.metadata.sectionTier ||
                        tier.id === item.variant.metadata.tierId
                    )?.name || '',
                    'items-start flex-grow max-w-24'
                  )}
                {TicketColumnItem(
                  intl.formatMessage({ id: 'seatReservation.section' }).toUpperCase(),
                  variant.metadata.sectionName || '-',
                  'items-center'
                )}
                {TicketColumnItem(
                  intl.formatMessage({ id: 'seatReservation.row' }).toUpperCase(),
                  seatDisplay.row,
                  'items-center'
                )}
                {TicketColumnItem(
                  intl.formatMessage({ id: 'seatReservation.position' }).toUpperCase(),
                  seatDisplay.position,
                  'items-end'
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const totalTickets = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-start items-center">
          <div className="-ml-5 -mb-2">
            <CardHeader
              title={
                intl.formatMessage({ id: 'cart.ticketinfo' }) +
                ` (${totalTickets} ${totalTickets > 1
                  ? intl.formatMessage({ id: 'ticket.tickets' })
                  : intl.formatMessage({ id: 'ticket.ticket' })
                })`
              }
            />
          </div>
        </div>

        <div className={classNames('transition-all duration-300 ease-in-out overflow-hidden')}>
          <div className="max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
            {!hasSeatMap ? GeneralAdmissionCartItems() : SeatReservationCartItems()}
          </div>
        </div>
      </div>

      <DiscountBox cart={cart} loadingCart={loadingCart} refetchCart={refetchCart} />

      <Separator className="my-2" />

      <div className="flex flex-col gap-1">
        {hasDiscount && discountTotal > 0 && (
          <div className="flex items-center justify-between">
            <p className="font-normal text-muted-foreground text-sm">
              {intl.formatMessage({ id: 'checkout.discount.discountLabel' })}
            </p>
            <p className="font-normal text-muted-foreground text-sm">-{formatPrice(discountTotal.toString())}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="font-medium">{intl.formatMessage({ id: 'payment.total' })}</p>
          <AnimatedPrice
            from={previousPrice > 0 ? previousPrice : currentPrice}
            to={currentPrice}
            className="font-bold text-lg"
          />
        </div>
      </div>
    </div>
  );
}
