'use client';

import { FlipEvent, useGetOrderDetailsQuery, useGetTicketTiersQuery } from '@/lib/__generated__/graphql';
import { formatPrice } from '@/lib/utils/format';
import { stringToLuxonVN, toVnShortDateFormat } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { useGetOrderType } from '@/state-management/hooks/useGetOrderType';
import { DateTime } from 'luxon';
import { useIntl } from 'react-intl';
import FlipBadge from '../badge';
import Loader from '../loading-indicator/Loader';
import { PaymentMethod } from '../payments/type';
import { Separator } from '../shadcn/ui/separator';

export function OrderDetails({
  cartId,
  orderId,
  event,
}: {
  cartId: string | undefined;
  orderId: string | undefined;
  event: FlipEvent | undefined | null;
}) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();
  const { getOrderStatusData } = useGetOrderType();
  const { data, loading } = useGetOrderDetailsQuery({
    variables: {
      input: {
        orderId: orderId,
        cartId: cartId,
      },
    },
    fetchPolicy: 'network-only',
  });

  const { data: ticketTiers, loading: ticketTiersLoading } = useGetTicketTiersQuery({
    variables: {
      data: {
        eventId: event?.id ?? '',
      },
    },
  });

  if (loading || ticketTiersLoading)
    return (
      <div className="flex flex-row justify-center py-7">
        <Loader />
      </div>
    );

  if (!data || !ticketTiers) return null;

  const order = data.getOrderDetails;

  const getPaymentMethodName = (method: PaymentMethod) => {
    if (!method || method?.length === 0) return '_';
    return formatMessage({ id: `order.paymentMethod.${method}` });
  };

  return (
    <div className="flex flex-col justify-start p-4 gap-1 overflow-y-scroll h-[80vh] sm:h-auto">
      <div className="flex justify-between">
        {order.status && (
          <FlipBadge variant={order.status}>
            <p className="text-sm p-1 px-2">{getOrderStatusData(order.status).text}</p>
          </FlipBadge>
        )}
      </div>
      <div className="flex justify-between py-2">
        <p className="font-semibold text-lg">{event?.name}</p>
      </div>

      <div className="flex justify-between">
        <p>{formatMessage({ id: 'orderDetails.cartNumber' })}:</p>
        <p>#{order.cartDisplayId ?? ''}</p>
      </div>

      {order.orderDisplayId && (
        <div className="flex justify-between">
          <p>{formatMessage({ id: 'orderDetails.orderNumber' })}:</p>
          <p>#{order.orderDisplayId ?? ''}</p>
        </div>
      )}

      <div className="flex justify-between">
        <p>{formatMessage({ id: 'orderDetails.time' })}:</p>
        <p>
          {stringToLuxonVN(order.createdAt, locale).toLocaleString(DateTime.TIME_24_SIMPLE)},{' '}
          {toVnShortDateFormat(stringToLuxonVN(order.createdAt, locale))}
        </p>
      </div>
      <div className="flex justify-between">
        <p>{formatMessage({ id: 'orderDetails.paymentMethod' })}:</p>
        <p>{getPaymentMethodName(order.payment?.provider as PaymentMethod)}</p>
      </div>

      <Separator className="border-neutral-200 w-full my-3" />
      <div className="flex justify-between">
        <p>Email:</p>
        <p>{order.email}</p>
      </div>

      {order.ticketTiers?.map((tier) => {
        return (
          <div className="flex justify-between" key={tier.id}>
            <p>{tier.name}:</p>
            <p>{tier.quantity}</p>
          </div>
        );
      })}

      {order.invoice && (
        <div className="flex flex-col gap-2">
          <Separator className="border-neutral-200 w-full my-3" />
          <p className="text-base font-semibold">{formatMessage({ id: 'orderDetails.invoice.title' })}</p>
          <div className="flex justify-between gap-2">
            <p className="flex-1">{formatMessage({ id: 'orderDetails.invoice.name' })}:</p>
            <p className="flex-1 text-end">{order.invoice.name}</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="flex-1">{formatMessage({ id: 'orderDetails.invoice.phone' })}:</p>
            <p className="flex-1 text-end">{order.invoice.phone}</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="flex-1">{formatMessage({ id: 'orderDetails.invoice.email' })}:</p>
            <p className="flex-1 text-end">{order.invoice.email}</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="flex-1">{formatMessage({ id: 'orderDetails.invoice.address' })}:</p>
            <p className="flex-1 text-end">{order.invoice.address}</p>
          </div>
          <div className="flex justify-between gap-2">
            <p className="flex-1">{formatMessage({ id: 'orderDetails.invoice.taxCode' })}:</p>
            <p className="flex-1 text-end">{order.invoice.tax_code}</p>
          </div>
        </div>
      )}

      <Separator className="border-neutral-200 w-full my-3" />
      <div className="flex justify-between">
        <p>{formatMessage({ id: 'orderDetails.subtotal' })}:</p>
        <p>{formatPrice(String(order.subTotal === 0 ? order.total : order.subTotal))}</p>
      </div>

      {order.tax && order.tax > 0 ? (
        <div className="flex justify-between">
          <p>{formatMessage({ id: 'orderDetails.tax' })}:</p>
          <p>{formatPrice(String(order.tax))}</p>
        </div>
      ) : null}

      {order.discount && order.discount > 0 ? (
        <div className="flex justify-between">
          <p>{formatMessage({ id: 'orderDetails.discount' })}:</p>
          <p>{formatPrice(String(order.discount))}</p>
        </div>
      ) : null}

      <div className="flex justify-between">
        <p className="font-semibold">{formatMessage({ id: 'orderDetails.total' })}:</p>
        <p className="font-semibold">{formatPrice(String(order.total))}</p>
      </div>
    </div>
  );
}
