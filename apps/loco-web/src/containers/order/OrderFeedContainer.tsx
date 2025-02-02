'use client';

import { OrderStatus } from '@/app/me/my-order/page';
import OrderCard from '@/components/order/OrderCard';
import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { MyOrders, useMyOrderQuery } from '@/lib/__generated__/graphql';
import { TicketXIcon } from 'lucide-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import TicketModalContainer from '../ticket-modal-container';

type Props = {
  orderStatus: OrderStatus;
};

export default function OrderFeedContainer({ orderStatus }: Props) {
  const { formatMessage } = useIntl();
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [ticketIds, setTicketIds] = useState<string[]>([]);
  const { data, loading, error } = useMyOrderQuery({
    variables: {
      input: {
        cursor: null,
        take: 100,
        type: orderStatus,
      },
    },
    fetchPolicy: 'no-cache',
  });

  if (error) {
    console.error('GraphQL error:', error);
  }

  const viewTicket = (tickets: string[]) => {
    if (tickets.length > 0) {
      setTicketIds(tickets);
      setOpenTicketModal(true);
    }
  };

  const orders: MyOrders[] = (data?.getMyOrders.orders as MyOrders[]) || [];

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-red">
      {loading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full">
          {new Array(5).fill(0).map((_, index) => {
            return <SkeletonCard key={index} index={index} />;
          })}
        </div>
      )}

      {orders.length === 0 && !loading && (
        <div className="flex flex-col gap-3 justify-center items-center w-full">
          <TicketXIcon size={100} color="gray" strokeWidth={1} />
          <p className="text-base font-medium text-muted-foreground">{formatMessage({ id: 'myOrder.noOrder' })}</p>
        </div>
      )}

      {orders.map((order: MyOrders, index: number) => (
        <OrderCard
          key={order.orderId ?? order.cartId ?? String(index)}
          order={order}
          orderStatus={orderStatus}
          onTicketClick={viewTicket}
        />
      ))}
      <TicketModalContainer ticketIds={ticketIds} isOpen={openTicketModal} onClose={() => setOpenTicketModal(false)} />
    </div>
  );
}
