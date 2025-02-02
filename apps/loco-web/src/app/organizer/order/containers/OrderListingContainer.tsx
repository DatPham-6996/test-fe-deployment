'use client';

import Loader from '@/components/loading-indicator/Loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table';
import { GetOrdersResponseOrder, useGetOrdersLazyQuery } from '@/lib/__generated__/graphql';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';

import { formatTimeAndDate, stringToLuxonVN } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';

import { PayoutPagingIndicator } from '@/app/organizer/payout/components/PayoutPagingIndicator';
import { Badge } from '@/components/shadcn/ui/badge';
import { Input } from '@/components/shadcn/ui/input';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils/format';
import { SearchIcon, TicketIcon } from 'lucide-react';

export default function OrderListingContainer() {
  const { formatMessage } = useIntl();
  const currentEvent = useRecoilValue(currentEventState);
  const currentOrg = useRecoilValue(currentOrgState);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [previousCursors, setPreviousCursors] = useState<Map<number, string>>(new Map());
  const [getorders, { data: ordersData, loading: loadingData }] = useGetOrdersLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!currentEvent || !currentOrg) {
      return;
    }

    getorders({
      variables: {
        eventId: currentEvent?.id ?? '',
        cursor: nextCursor !== '' ? { id: nextCursor } : undefined,
        q: searchQuery,
      },
    });
  }, [currentEvent, currentOrg, getorders, nextCursor, searchQuery]);

  const orders = ordersData?.getOrders.orders;
  const pageInfo = ordersData?.getOrders.pageInfo;

  const loadNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      setPreviousCursors(new Map(previousCursors.set(currentPage, nextCursor)));
      setCurrentPage(currentPage + 1);
      setNextCursor(pageInfo.endCursor);
    }
  };

  const loadPreviousPage = () => {
    if (currentPage > 1 && previousCursors.has(currentPage - 1)) {
      setCurrentPage(currentPage - 1);
      setNextCursor(previousCursors.get(currentPage - 1) ?? '');
    }
  };

  const onSearch = (q: string) => {
    if (q === '') {
      setSearchQuery(undefined);
    } else {
      setSearchQuery(q);
      setCurrentPage(1);
      setNextCursor('');
    }
  };

  const EmptyOrderHolder = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className=" mb-4">
          <TicketIcon className="w-24 h-24 stroke-gray-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{formatMessage({ id: 'order.emptyTitle' })}</h2>
        <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
          {formatMessage({ id: 'order.emptyDescription' })}
        </p>
      </div>
    );
  };

  const orderIsEmpty = !loadingData && (!orders || orders.length === 0);
  const showLoadingIndicator = loadingData || !orders;
  const showPagingIndicator = !orderIsEmpty && !showLoadingIndicator;

  const OrderListingBody = () => {
    return (
      <>
        {showLoadingIndicator && <Loader className="my-12" />}
        {!showLoadingIndicator && orderIsEmpty && <EmptyOrderHolder />}
        {!showLoadingIndicator && !orderIsEmpty && (
          <OrderTable orders={orders as GetOrdersResponseOrder[]} className="mt-2" />
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-3 items-center">
        <SearchIcon className="w-6 h-6 " />
        <Input
          key="order-search-bar"
          type="search"
          value={searchQuery}
          placeholder={formatMessage({ id: 'order.searchPlaceholder' })}
          onChange={(e) => {
            e.preventDefault();
            return onSearch(e.target.value);
          }}
          className="h-12 text-sm max-w-[400px]"
        />
      </div>
      <OrderListingBody />
      {showPagingIndicator && (
        <div className="flex self-center mt-4 items-center">
          <PayoutPagingIndicator
            onLoadNextPage={loadNextPage}
            onLoadPreviousPage={loadPreviousPage}
            currentPage={currentPage}
            hasNextPage={pageInfo?.hasNextPage ?? false}
          />
        </div>
      )}
    </div>
  );
}

function OrderTable({ orders, className }: { orders: GetOrdersResponseOrder[]; className?: string }) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();

  const OrderTableHead = ({ title, className }: { title: string; className?: string }) => {
    return <TableHead className={cn('text-foreground font-semibold text-sm py-3', className)}>{title}</TableHead>;
  };

  if (!orders || orders.length === 0) {
    return <div className="text-center py-12">{formatMessage({ id: 'payout.noTransactions' })}</div>;
  }

  const formatPaymentMethod = (paymentMethod: string) => {
    if (paymentMethod === 'card') {
      return formatMessage({ id: 'order.paymentMethod.card' });
    } else if (paymentMethod === 'virtual-account') {
      return formatMessage({ id: 'order.paymentMethod.virtual-account' });
    } else if (paymentMethod === 'momo') {
      return formatMessage({ id: 'order.paymentMethod.momo' });
    } else if (!paymentMethod) {
      return '_';
    }
    return paymentMethod;
  };

  const formatOrderStatus = (status: string) => {
    if (status === 'completed') {
      return (
        <Badge variant={'outline'} className="bg-green-50 dark:bg-green-600 border-green-600 dark:border-green-600">
          {formatMessage({ id: 'order.status.completed' })}
        </Badge>
      );
    } else if (status === 'canceled') {
      return (
        <Badge variant={'outline'} className="bg-red-50 dark:bg-red-600 border-red-600 dark:border-red-600">
          {formatMessage({ id: 'order.status.canceled' })}
        </Badge>
      );
    } else {
      return (
        <Badge variant={'outline'} className="bg-blue-50 dark:bg-blue-600 border-blue-600 dark:border-blue-600">
          {formatMessage({ id: 'order.status.pending' })}
        </Badge>
      );
    }
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <OrderTableHead title={formatMessage({ id: 'order.orderDisplayIdLabel' })} />
          <OrderTableHead title={formatMessage({ id: 'order.receiverNameLabel' })} />
          <OrderTableHead title={formatMessage({ id: 'order.paymentMethodLabel' })} />
          <OrderTableHead title={formatMessage({ id: 'order.paidAmountLabel' })} />
          <OrderTableHead title={formatMessage({ id: 'order.discountAmountLabel' })} />
          <OrderTableHead title={formatMessage({ id: 'order.statusLabel' })} />
          <OrderTableHead title={formatMessage({ id: 'order.createdAtLabel' })} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          return (
            <TableRow key={order.orderId} className="h-12">
              <TableCell width={80}>{order.orderDisplayId}</TableCell>
              <TableCell width={120} className="flex flex-col gap-1">
                <div className="font-medium">{order.receiverEmail}</div>
                <div>{order.receiverName}</div>
              </TableCell>
              <TableCell width={150}>{formatPaymentMethod(order.paymentMethod)}</TableCell>
              <TableCell width={120}>{formatPrice(order.total.toString())}</TableCell>
              <TableCell width={120}>{formatPrice(order.discountTotal.toString())}</TableCell>
              <TableCell width={120}>{formatOrderStatus(order.status)}</TableCell>
              <TableCell>{formatTimeAndDate(stringToLuxonVN(order.createdAt, locale), locale)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
