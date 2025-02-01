'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipLayout } from '@/containers/flip-layout';
import OrderFeedContainer from '@/containers/order/OrderFeedContainer';
import { useAuth } from '@/state-management/hooks/useAuth';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export type OrderStatus = 'ALL' | 'COMPLETED' | 'PENDING' | 'CANCELED';

export default function MyOrderPage() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { isLoggedIn, openLoginModal } = useAuth();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('ALL');

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
      openLoginModal();
    }
  }, [isLoggedIn, router, openLoginModal]);

  const onValueChange = (v: string) => {
    setOrderStatus(v as OrderStatus);
  };

  const OrderTypeSegment = (
    <Tabs
      defaultValue="ALL"
      onValueChange={onValueChange}
      className="space-y-4 border border-neutral-300 rounded-lg p-[0.5]"
    >
      <TabsList className="bg-zinc-200">
        <TabsTrigger value="ALL">{formatMessage({ id: 'myOrder.all' })}</TabsTrigger>
        <TabsTrigger value="COMPLETED">{formatMessage({ id: 'myOrder.completed' })}</TabsTrigger>
        <TabsTrigger value="PENDING">{formatMessage({ id: 'myOrder.pending' })}</TabsTrigger>
        <TabsTrigger value="CANCELED">{formatMessage({ id: 'myOrder.cancelled' })}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
  return (
    <FlipLayout>
      <ContentCenterNarrow>
        <div className="flex flex-col w-full">
          <div className="flex my-9 flex-col sm:flex-row justify-between align-middle gap-2">
            <div className="flex flex-col">
              <p className="text-2xl font-bold">{formatMessage({ id: 'myOrder.title' })}</p>
            </div>
            <div className="flex">{OrderTypeSegment}</div>
          </div>
          <OrderFeedContainer orderStatus={orderStatus} />
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
