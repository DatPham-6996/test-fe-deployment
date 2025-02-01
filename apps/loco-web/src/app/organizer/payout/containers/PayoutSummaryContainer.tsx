'use client';

import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';
import { CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/shadcn/ui/button';
import {
  useGetEventFinancialSummaryLazyQuery,
  useMyEventWalletLazyQuery,
  usePayoutSummaryLazyQuery,
} from '@/lib/__generated__/graphql';
import { formatPrice } from '@/lib/utils/format';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { PayoutRequestDialog } from '../components/PayoutRequestDialog';
import { SummaryCard } from '../../components/SummaryCard';

export function PayoutSummaryContainer() {
  const { formatMessage } = useIntl();
  const [currentEvent] = useRecoilState(currentEventState);
  const [currentOrg] = useRecoilState(currentOrgState);
  const { openDialog } = useResponsiveDialog();

  const eventId = currentEvent?.id ?? '';
  const organizationId = currentOrg?.id ?? '';

  const [getFinancialSummary, { data: getFinancialSummaryData }] = useGetEventFinancialSummaryLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        eventId,
        organizationId,
      },
    },
  });

  const [getMyEventWallet, { data: getMyEventWalletData, refetch: refetchMyEventWalletData }] =
    useMyEventWalletLazyQuery({
      fetchPolicy: 'network-only',
      variables: {
        input: {
          eventId,
          organizationId,
        },
      },
    });

  const [getPayoutSummary, { data: getPayoutSummaryData }] = usePayoutSummaryLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        eventId,
        organizationId,
      },
    },
  });

  useEffect(() => {
    if (eventId && organizationId) {
      getFinancialSummary();
      getMyEventWallet();
      getPayoutSummary();
    }
  }, [eventId, getFinancialSummary, organizationId, getMyEventWallet, getPayoutSummary]);

  const financialSummary = getFinancialSummaryData?.getEventOrderFinancialSummary;
  const eventWallet = getMyEventWalletData?.myEventWallet;
  const payoutSummary = getPayoutSummaryData?.payoutSummary;

  const relatedRevenueSummaryCards = [
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.totalRevenueAmount' }),
      value: formatPrice(String(financialSummary?.totalRevenueAmount ?? 0)),
    },
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.totalFeeAmount' }),
      value: `-${formatPrice(String(financialSummary?.totalFeeAmount ?? 0))}`,
    },
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.totalAddOnAmount' }),
      value: formatPrice(String(financialSummary?.totalAddOnAmount ?? 0)),
    },
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.profitAmount' }),
      value: formatPrice(String(financialSummary?.profitAmount ?? 0)),
    },
  ];

  const relatedBalanceSummaryCards = [
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.pendingBalance' }),
      value: formatPrice(String(financialSummary?.pendingBalance ?? 0)),
    },
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.balance' }),
      value: formatPrice(String(eventWallet?.amount ?? 0)),
      action: (
        <div className="flex flex-row items-start">
          <Button
            variant={'link'}
            fullWidth={false}
            className="text-blue-700 dark:text-blue-400 font-light text-base px-0 underline"
            size={'sm'}
            onClick={() =>
              openDialog(
                <PayoutRequestDialog
                  refetchMyEventWalletData={refetchMyEventWalletData}
                  eventId={eventId}
                  organizationId={currentOrg?.id ?? ''}
                />
              )
            }
          >
            {formatMessage({ id: 'payout.requestPayout' })}
          </Button>
        </div>
      ),
    },
    {
      icon: <CircleDollarSign size={16} />,
      title: formatMessage({ id: 'payout.totalPaidOutAmount' }),
      value: formatPrice(String(payoutSummary?.totalPaidOutAmount ?? 0)),
    },
  ];

  return (
    <>
      <div className="text-lg font-semibold">{formatMessage({ id: 'payout.revenueTitle' })}</div>
      {/* <div className="font-normal mb-4">{formatMessage({ id: 'payout.revenueDes' })}</div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pb-6 mt-4">
        {relatedRevenueSummaryCards.map((card, index) => (
          <SummaryCard title={card.title} icon={card.icon} value={card.value} key={index} />
        ))}
      </div>

      <div className="text-lg font-semibold">{formatMessage({ id: 'payout.balanceTitle' })}</div>
      {/* <div className="font-normal">{formatMessage({ id: 'payout.balanceDes' })}</div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4">
        {relatedBalanceSummaryCards.map((card, index) => (
          <SummaryCard title={card.title} icon={card.icon} value={card.value} key={index} action={card.action} />
        ))}
      </div>
    </>
  );
}
