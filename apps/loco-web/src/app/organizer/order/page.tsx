'use client';

import { useGetEventFinancialSummaryLazyQuery } from '@/lib/__generated__/graphql';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { ShoppingBagIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';
import { SummaryCard } from '../components/SummaryCard';
import OrderListingContainer from './containers/OrderListingContainer';
import OrderReportExportButton from './containers/OrderReportExportContainer';

export default function OrdersPage() {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [currentEvent] = useRecoilState(currentEventState);
  const [currentOrg] = useRecoilState(currentOrgState);

  useEffect(() => {
    if (!currentEvent) {
      router.replace('/organizer');
    }
  }, [currentEvent, router]);

  const eventId = currentEvent?.id ?? '';
  const organizationId = currentOrg?.id ?? '';

  const [
    getFinancialSummary,
    { data: getFinancialSummaryData, refetch: refetchFinancialSummaryData, loading: loadingFinancialSummaryData },
  ] = useGetEventFinancialSummaryLazyQuery({
    variables: {
      input: {
        eventId,
        organizationId,
      },
    },
  });

  useEffect(() => {
    if (eventId) {
      getFinancialSummary();
    }
  }, [eventId, getFinancialSummary]);

  const financialSummary = getFinancialSummaryData?.getEventOrderFinancialSummary;

  const relatedOrderSummaryCards = [
    {
      icon: <ShoppingBagIcon size={16} />,
      title: formatMessage({ id: 'order.totalOrdersCount' }),
      value: String(financialSummary?.totalOrdersCount ?? 0),
    },
    {
      icon: <ShoppingBagIcon size={16} />,
      title: formatMessage({ id: 'order.pendingOrdersCount' }),
      value: String(financialSummary?.pendingOrdersCount ?? 0),
    },
    {
      icon: <ShoppingBagIcon size={16} />,
      title: formatMessage({ id: 'order.canceledOrdersCount' }),
      value: String(financialSummary?.canceledOrdersCount ?? 0),
    },
  ];

  return (
    <div className="container px-5 md:px-20 mb-20">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-semibold text-[34px] my-5 text-center md:text-start">
          {formatMessage({ id: 'order.title' })}
        </h1>
        <OrderReportExportButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4">
        {relatedOrderSummaryCards.map((card, index) => (
          <SummaryCard title={card.title} icon={card.icon} value={card.value} key={index} />
        ))}
      </div>
      <OrderListingContainer />
    </div>
  );
}
