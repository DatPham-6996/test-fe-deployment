'use client';

import Loader from '@/components/loading-indicator/Loader';
import { Button } from '@/components/shadcn/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table';
import { MyPayout, Payout_Settlement_Status_Enum, usePayoutRequestLazyQuery } from '@/lib/__generated__/graphql';
import { formatPrice } from '@/lib/utils/format';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { formatDate, formatTime, stringToLuxonVN } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import classNames from 'classnames';

import { Badge } from '@/components/shadcn/ui/badge';
import { cn } from '@/lib/utils';
import { PayoutPagingIndicator } from '../components/PayoutPagingIndicator';
import PayoutReportExportContainer from './PayoutReportExportContainer';

export default function PayoutHistoryContainer() {
  const currentEvent = useRecoilValue(currentEventState);
  const currentOrg = useRecoilValue(currentOrgState);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [previousCursors, setPreviousCursors] = useState<Map<number, string>>(new Map());
  const [settlementStatus, setSettlementStatus] = useState<Payout_Settlement_Status_Enum | undefined>();
  const [getPayoutRequests, { data: payoutRequestQueryData, loading: loadingPayoutRequests }] =
    usePayoutRequestLazyQuery({
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    if (!currentEvent || !currentOrg) {
      return;
    }

    getPayoutRequests({
      variables: {
        input: {
          eventId: currentEvent?.id ?? '',
          organizationId: currentOrg?.id ?? '',
          take: 10,
          cursor: nextCursor !== '' ? { id: nextCursor } : undefined,
          settlementStatus: settlementStatus,
        },
      },
    });
  }, [currentEvent, currentOrg, getPayoutRequests, nextCursor, settlementStatus]);

  const payouts = payoutRequestQueryData?.payouts?.payouts;
  const pageInfo = payoutRequestQueryData?.payouts?.pageInfo;

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

  const showLoadingIndicator = loadingPayoutRequests || !payouts;
  const showPagingIndicator = loadingPayoutRequests || !payouts || payouts.length === 0;

  return (
    <div className="flex flex-col mt-7">
      <PayoutTableHeader />
      <PayoutRequestFilterBar
        selectedSettlementStatus={settlementStatus}
        setSelectedSettlementStatus={setSettlementStatus}
      />
      {showLoadingIndicator && <Loader className="my-12" />}
      {!showLoadingIndicator && <PayoutTable payouts={payouts as MyPayout[]} className="mt-2" />}
      {!showPagingIndicator && (
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

const PayoutTableHeader = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <p className="font-semibold text-lg">{formatMessage({ id: 'payout.payoutRequests' })}</p>
      <p className="font-normal text-base mb-4">{formatMessage({ id: 'payout.payoutRequestsDes' })}</p>
    </>
  );
};

function PayoutTable({ payouts, className }: { payouts: MyPayout[]; className?: string }) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();

  const PayoutTableHead = ({ title, className }: { title: string; className?: string }) => {
    return <TableHead className={cn('text-foreground font-semibold text-sm py-3', className)}>{title}</TableHead>;
  };

  if (!payouts || payouts.length === 0) {
    return <div className="text-center py-12">{formatMessage({ id: 'payout.noTransactions' })}</div>;
  }

  const formatStatus = (status: string) => {
    switch (status) {
      case 'SUCCEEDED':
        return (
          <Badge variant={'outline'} className="bg-green-50 dark:bg-green-600 border-green-600 dark:border-green-600">
            {formatMessage({ id: 'payout.succeeded' })}
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge variant={'outline'} className="bg-blue-50 dark:bg-blue-500 border-blue-500 dark:border-blue-500">
            {formatMessage({ id: 'payout.pending' })}
          </Badge>
        );
      case 'ACCEPTED':
        return (
          <Badge variant={'outline'} className="bg-blue-50 dark:bg-blue-500 border-blue-500 dark:border-blue-500">
            {formatMessage({ id: 'payout.accepted' })}
          </Badge>
        );
      case 'REQUESTED':
        return (
          <Badge variant={'outline'} className="bg-blue-50 dark:bg-blue-500 border-blue-500 dark:border-blue-500">
            {formatMessage({ id: 'payout.requested' })}
          </Badge>
        );
      case 'FAILED':
        return (
          <Badge variant={'outline'} className="bg-red-50 dark:bg-red-500 border-red-500 dark:border-red-500">
            {formatMessage({ id: 'payout.failed' })}
          </Badge>
        );
      case 'REVERSED':
        return (
          <Badge variant={'outline'} className="bg-red-50 dark:bg-red-500 border-red-500 dark:border-red-500">
            {formatMessage({ id: 'payout.reversed' })}
          </Badge>
        );
      case 'CANCELLED':
        return (
          <Badge variant={'outline'} className="bg-gray-50 dark:bg-gray-500 border-gray-500 dark:border-gray-500">
            {formatMessage({ id: 'payout.canceled' })}
          </Badge>
        );
      default:
        return status;
    }
  };

  const shouldShowSettlementStatus = (payoutStatus: string) => {
    return payoutStatus === 'PENDING' || payoutStatus === 'SUCCEEDED' || payoutStatus === 'ACCEPTED';
  };

  const formatSettlementStatus = (status: string, payoutStatus: string) => {
    if (!shouldShowSettlementStatus(payoutStatus)) {
      return '...';
    }

    switch (status) {
      case 'PENDING':
        return (
          <Badge variant={'outline'} className="bg-blue-50 dark:bg-blue-500 border-blue-500 dark:border-blue-500">
            {formatMessage({ id: 'payout.pending' })}
          </Badge>
        );
      case 'SETTLED':
        return (
          <Badge variant={'outline'} className="bg-green-50 dark:bg-green-600 border-green-600 dark:border-green-600">
            {formatMessage({ id: 'payout.settled' })}
          </Badge>
        );
      default:
        return status;
    }
  };

  const formatTransactionMethod = (method: string) => {
    switch (method) {
      case 'BANK_ACCOUNT':
        return formatMessage({ id: 'payout.transfer' });
      default:
        return method;
    }
  };

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <PayoutTableHead title={formatMessage({ id: 'payout.createdAt' })} />
          <PayoutTableHead title={formatMessage({ id: 'payout.requestedBy' })} />
          <PayoutTableHead title={formatMessage({ id: 'payout.transactionMethod' })} />
          <PayoutTableHead title={formatMessage({ id: 'payout.amount' })} />
          <PayoutTableHead title={formatMessage({ id: 'payout.payoutStatus' })} />
          <PayoutTableHead title={formatMessage({ id: 'payout.settlementStatus' })} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {payouts.map((payout) => {
          const createdAt = stringToLuxonVN(payout.created_at, locale);
          return (
            <TableRow key={payout.id} className="h-12">
              <TableCell width={150}>
                {formatTime(createdAt, locale)}, {formatDate(createdAt, locale)}
              </TableCell>
              <TableCell width={150}>
                {payout.requested_by_user?.first_name} {payout.requested_by_user?.last_name}
              </TableCell>
              <TableCell width={150}>{formatTransactionMethod(payout.payout_method?.account_type)}</TableCell>
              <TableCell width={150}>
                <div className="font-medium flex flex-row gap-2 items-center">{formatPrice(String(payout.amount))}</div>
              </TableCell>
              <TableCell width={150}>{formatStatus(payout.status)}</TableCell>
              <TableCell>{formatSettlementStatus(payout.settlement_status, payout.status)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const settlementStatusOptions = [
  { value: Payout_Settlement_Status_Enum.Pending, label: { id: 'payout.pending' } },
  { value: Payout_Settlement_Status_Enum.Settled, label: { id: 'payout.settled' } },
];

function PayoutRequestFilterBar({
  selectedSettlementStatus,
  setSelectedSettlementStatus,
}: {
  selectedSettlementStatus: Payout_Settlement_Status_Enum | undefined;
  setSelectedSettlementStatus: (option: Payout_Settlement_Status_Enum | undefined) => void;
}) {
  const { formatMessage } = useIntl();

  const filterCount = [selectedSettlementStatus].filter((x) => x !== undefined).length;
  const filterIsActive = filterCount > 0;

  function SettlementStatusFilterDropdown() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={classNames('border border-black rounded-md px-3 py-2', {
              'border-2': filterIsActive,
            })}
          >
            <SlidersHorizontalIcon size={16} className="mr-2" />
            <div
              className={classNames('text-sm font-medium', {
                'font-semibold': filterIsActive,
              })}
            >
              {formatMessage({ id: 'payout.filter' })}
              {filterIsActive && ` (${filterCount})`}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>{formatMessage({ id: 'payout.settlementStatus' })}</DropdownMenuLabel>
          {settlementStatusOptions.map((option) => {
            return (
              <DropdownMenuCheckboxItem
                checked={selectedSettlementStatus === option.value}
                onCheckedChange={() => {
                  if (selectedSettlementStatus === option.value) {
                    setSelectedSettlementStatus(undefined);
                  } else {
                    setSelectedSettlementStatus(option.value);
                  }
                }}
                key={option.value}
              >
                {formatMessage({ id: option.label.id })}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex flex-row">
      <SettlementStatusFilterDropdown />
    </div>
  );
}
