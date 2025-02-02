'use client';
import { OrderStatus } from '@/app/me/my-order/page';
import { MyOrders, useGetTicketIdsByOrderLazyQuery } from '@/lib/__generated__/graphql';
import { MediaCollection } from '@/lib/types';
import { formatPrice, getTicketTypeDisplay } from '@/lib/utils/format';
import { setPreviousPage } from '@/lib/utils/previous-page';
import { toVnShortDateFormat } from '@/lib/utils/time-format';
import { useGetOrderType } from '@/state-management/hooks/useGetOrderType';
import { DateTime } from 'luxon';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import FlipBadge from '../badge';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { Button } from '../shadcn/ui/button';
import { Separator } from '../shadcn/ui/separator';
import { OrderDetails } from './OrderDetails';

export type OrderCardProps = {
  key: string;
  order: MyOrders;
  orderStatus: OrderStatus;
  onTicketClick: (tickets: string[]) => void;
};

export default function OrderCard({ order, key, orderStatus, onTicketClick }: OrderCardProps) {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { openDialog } = useResponsiveDialog();
  const { getOrderStatusData } = useGetOrderType();

  // Lazy load ticket onclick
  const [getTicketIds, { loading: getTicketIdsLoading }] = useGetTicketIdsByOrderLazyQuery({
    variables: {
      orderId: order.orderId ?? '',
    },
  });

  if (!order) return;

  const { createdAt, event, total, orderDisplayId, cartDisplayId, type, ticketTiers } = order;

  if (!event) return;

  const mediaCollection = event.mediaCollection as MediaCollection;

  const getCoverPhoto = () => {
    if (mediaCollection.cover && event.media && event.media.length) {
      return event.media.find((item: any) => mediaCollection.cover === item.id);
    }
    return null;
  };

  const handleTicketClick = async () => {
    const { data } = await getTicketIds();
    onTicketClick(data?.getTicketIdsByOrder || []);
  };

  const coverImg = getCoverPhoto();
  const coverImgUrl = coverImg ? coverImg.url : '/assets/images/default.png';

  const onEventClick = () => {
    setPreviousPage(window.location.href);
    router.push(`/events/${event.handle}`);
  };
  const openOrderDetails = () => {
    openDialog(
      <OrderDetails
        cartId={order.cartId ? String(order.cartId) : undefined}
        orderId={order.orderId ? String(order.orderId) : undefined}
        event={order.event}
      />
    );
  };
  const ButtonRow = (
    <div className="flex gap-2 justify-start">
      {orderStatus !== 'PENDING' && (
        <Button onClick={openOrderDetails} size={'sm'} className="w-[150px]">
          {formatMessage({ id: 'myOrder.order' })}
        </Button>
      )}

      {orderStatus === 'COMPLETED' && (
        <Button
          onClick={handleTicketClick}
          loading={getTicketIdsLoading}
          variant="secondary"
          size={'sm'}
          className="w-[150px]"
        >
          {formatMessage({ id: 'myOrder.viewTicket' })}
        </Button>
      )}

      <Button onClick={onEventClick} variant="secondary" size={'sm'} className="w-[150px]">
        {formatMessage({ id: 'myOrder.viewEvent' })}
      </Button>
    </div>
  );

  const ItemTitleText = (text: string) => <p className="text-muted-foreground text-xs font-medium">{text}</p>;

  const ItemText = (text: string) => <p className="text-sm font-normal">{text}</p>;

  const Header = (
    <div className="flex gap-2 items-start justify-between flex-wrap">
      <div className="flex flex-col gap-2">
        {ItemTitleText(formatMessage({ id: 'myOrder.createdAt' }))}
        {ItemText(toVnShortDateFormat(DateTime.fromISO(createdAt), true))}
      </div>

      <div className="flex flex-col gap-2">
        {ItemTitleText(formatMessage({ id: 'myOrder.total' }))}
        {ItemText(formatPrice(String(total)))}
      </div>

      <div className="flex flex-col gap-2">
        {ItemTitleText(formatMessage({ id: 'myOrder.ticketType' }))}
        {ItemText(getTicketTypeDisplay(type))}
      </div>

      {!orderDisplayId && (
        <div className="flex flex-col gap-2">
          {ItemTitleText(formatMessage({ id: 'myOrder.cartNumber' }))}
          {ItemText(cartDisplayId ?? '')}
        </div>
      )}

      {orderDisplayId && (
        <div className="flex flex-col gap-2">
          {ItemTitleText(formatMessage({ id: 'myOrder.orderNumber' }))}
          {ItemText(orderDisplayId ?? '')}
        </div>
      )}
    </div>
  );

  const TicketInfo = () => {
    if (!ticketTiers || ticketTiers.length === 0) return null;

    const tickets = ticketTiers.map((tier) => {
      const { quantity, name, id } = tier;

      if (!name) {
        return null;
      }

      return (
        <p key={key + id} className="text-sm font-medium px-1">
          <span className="rounded-md">
            {quantity} x {name}
          </span>
        </p>
      );
    });

    return <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 pb-2 sm:pb-0">{tickets}</div>;
  };

  return (
    <div key={key} className="flex w-full max-w-[600px]">
      <div className="flex flex-col gap-2 p-4 mb-2 w-full border-2 bg-secondary rounded-xl">
        {Header}
        <Separator className="w-full my-1" />

        <div className="flex gap-2 justify-between">
          {/* Left Content */}
          <div className="flex flex-col flex-1 gap-1.5 md:max-w-[420px] max-w-[calc(90%-90px)]">
            <div className="flex">
              <FlipBadge variant={orderStatus}>{getOrderStatusData(orderStatus).text}</FlipBadge>
            </div>
            <p className="text-lg font-bold">{event.name}</p>
            {TicketInfo()}
          </div>
          {/* Right Image */}
          <div className="flex !w-[100px] !h-[100px] md:!w-[130px] md:!h-[130px]">
            <Image
              className="rounded-md object-cover  !aspect-square"
              layout="responsive"
              width={130}
              height={130}
              alt="a"
              src={coverImgUrl}
            />
          </div>
        </div>
        {ButtonRow}
      </div>
    </div>
  );
}
