import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Card } from '@/components/shadcn/ui/card';
import {
  GetEventFinancialSummaryQuery,
  MyEventWalletQuery,
  Payout_Settlement_Status_Enum,
  useCreateEventPayoutRequestMutation,
  useGetPayoutMethodsQuery,
  usePayoutsQuery,
} from '@/lib/__generated__/graphql';
import { formatPrice } from '@/lib/utils/format';
import { ChangeEvent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { LandmarkIcon } from 'lucide-react';
import { Button } from '@/components/shadcn/ui/button';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { Input } from '@/components/shadcn/ui/input';

export function PayoutRequestDialog({
  refetchMyEventWalletData,
  eventId,
  organizationId,
}: {
  refetchMyEventWalletData: () => any;
  eventId: string;
  organizationId: string;
}) {
  const { closeDialog } = useResponsiveDialog();
  const { formatMessage } = useIntl();
  const [loadingFinancialSummaryData, setLoadingFinancialSummaryData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [payoutRequestAmount, setPayoutRequestAmount] = useState('');
  const [eventWallet, setEventWallet] = useState<MyEventWalletQuery['myEventWallet']>();
  const { data: payoutsQueryData, loading: payoutsQueryLoading } = usePayoutsQuery({
    fetchPolicy: 'network-only',
    variables: { input: { eventId, organizationId, take: 1, settlementStatus: Payout_Settlement_Status_Enum.Pending } },
  });
  const { data: payoutMethodsQueryData, loading: payoutMethodsQueryLoading } = useGetPayoutMethodsQuery({
    variables: { input: { eventId, organizationId } },
  });

  const payouts = payoutsQueryData?.payouts.payouts ?? [];
  const payoutMethods = payoutMethodsQueryData?.payoutMethods ?? [];

  const hasPendingPayout = payouts.length > 0;
  const hasPayoutMethod = payoutMethods.length > 0;
  const balanceNumber = BigInt(eventWallet?.amount ?? 0);
  const minPayoutAmount = 5_000_000; // 5m VND
  const maxPayoutAmount = 299_000_000; // 299m VND
  const payoutAmount = Number(payoutRequestAmount.replace(/\./g, ''));
  const isValidBalanceAmount = balanceNumber >= BigInt(minPayoutAmount) && balanceNumber >= BigInt(payoutAmount);
  const isValidPayoutAmount = payoutAmount >= minPayoutAmount && payoutAmount <= maxPayoutAmount;

  const [createPayoutRequest] = useCreateEventPayoutRequestMutation({
    variables: {
      input: {
        eventId,
        organizationId,
        payoutMethodId: payoutMethods[0]?.id ?? '',
        amount: Number(payoutRequestAmount.replace(/\./g, '')),
      },
    },
  });

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      await createPayoutRequest();
      toastSuccess(formatMessage({ id: 'payout.requestPayoutSuccess' }));
      closeDialog();
    } catch (error) {
      toastError(formatMessage({ id: 'common.error' }));
    } finally {
      setSubmitting(false);
    }
  };

  // Test build
  useEffect(() => {
    (async () => {
      try {
        const { data } = await refetchMyEventWalletData();
        setEventWallet(data.myEventWallet);
        setLoadingFinancialSummaryData(false);
      } catch (error) {
        toastError(formatMessage({ id: 'common.error' }));
      }
    })();
  }, [refetchMyEventWalletData, formatMessage]);

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, '');
    if (!/^\d*$/.test(rawValue)) {
      return;
    }

    const formattedValue = formatNumber(rawValue);
    setPayoutRequestAmount(formattedValue);
  };

  return (
    <>
      <div className="flex flex-col pb-2">
        <p className="text-3xl font-medium mt-8">{formatMessage({ id: 'payout.requestPayout' })}</p>
      </div>
      <div className="h6 font-medium">{formatMessage({ id: 'payout.totalMoney' })}:</div>
      <div className="text-2xl font-bold">
        {loadingFinancialSummaryData ? <PulseLoader size={8} /> : formatPrice(String(balanceNumber))}
      </div>

      <div>
        <div className="h6 font-medium mb-2">{formatMessage({ id: 'payout.payoutAmount' })}:</div>
        <Input
          placeholder={formatMessage({ id: 'payout.enterPayoutAmount' })}
          onChange={handleChange}
          value={payoutRequestAmount}
        />
        <div className={`text-[#00749e] font-normal text-xs my-2 ${isValidPayoutAmount ? '' : '!text-red-500'}`}>
          {formatMessage({ id: 'payout.invalidPayoutAmount' })}
        </div>
      </div>

      <div className="h6 font-medium">{formatMessage({ id: 'payout.payoutMethod' })}:</div>

      {payoutMethodsQueryLoading && <PulseLoader size={8} className="!block" />}

      {!payoutMethodsQueryLoading && hasPayoutMethod && (
        <Card className="flex p-2">
          <div className="flex ml-4 mr-6 items-center h-full"> 
            <LandmarkIcon size={24} />
          </div>
          <div className="flex-col">
            <div>{payoutMethods[0]?.channel_name}</div>
            <div>{payoutMethods[0]?.account_number}</div>
            <div>{payoutMethods[0]?.account_name}</div>
          </div>
        </Card>
      )}

      {!payoutMethodsQueryLoading && !hasPayoutMethod && (
        <div className="text-red-600">{formatMessage({ id: 'payout.notHasPayoutMethod' })}</div>
      )}

      <div className="mt-2">
        {hasPendingPayout && <div className="text-red-600">{formatMessage({ id: 'payout.hasPendingPayout' })}</div>}
        {!isValidBalanceAmount && (
          <div className="text-red-600">{formatMessage({ id: 'payout.notEnoughMoneyToPayout' })}</div>
        )}
      </div>

      <Button
        className="mb-2"
        size={'lg'}
        disabled={
          hasPendingPayout ||
          !hasPayoutMethod ||
          payoutsQueryLoading ||
          loadingFinancialSummaryData ||
          !isValidBalanceAmount ||
          !isValidPayoutAmount
        }
        loading={submitting}
        onClick={onSubmit}
      >
        {formatMessage({ id: 'payout.requestPayout' })}
      </Button>
    </>
  );
}
