'use client';

import Loader from '@/components/loading-indicator/Loader';
import { Button } from '@/components/shadcn/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table';
import {
  Balance,
  Balance_Transaction_Money_Flow_Enum,
  Balance_Transaction_Type_Enum,
  Maybe,
  useBalanceTransactionsLazyQuery,
} from '@/lib/__generated__/graphql';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { formatDate, formatTime, stringToLuxonVN } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';
import classNames from 'classnames';

import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/shadcn/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { cn } from '@/lib/utils';
import { enUS, vi } from 'date-fns/locale';
import { PayoutPagingIndicator } from '../components/PayoutPagingIndicator';
import DateRangePicker from '@/components/date-picker';
export default function TransactionHistoryContainer() {
  const currentEvent = useRecoilValue(currentEventState);
  const currentOrg = useRecoilValue(currentOrgState);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [previousCursors, setPreviousCursors] = useState<Map<number, string>>(new Map());
  const [selectedMoneyFlow, setSelectedMoneyFlow] = useState<Balance_Transaction_Money_Flow_Enum | null>(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState<Balance_Transaction_Type_Enum | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const [getBalanceTransactions, { data: transactionsQueryData, loading: loadingTransactions }] =
    useBalanceTransactionsLazyQuery({
      fetchPolicy: 'network-only',
    });

  useEffect(() => {
    if (!currentEvent || !currentOrg) {
      return;
    }

    const formatStartTime = (date: Date) => {
      return format(date, "yyyy-MM-dd'T'00:00:00.000'Z'");
    };

    const formatEndTime = (date: Date) => {
      return format(date, "yyyy-MM-dd'T'23:59:59.999'Z'");
    };

    getBalanceTransactions({
      variables: {
        input: {
          eventId: currentEvent?.id ?? '',
          organizationId: currentOrg?.id ?? '',
          take: 10,
          cursor: nextCursor !== '' ? { id: nextCursor } : null,
          where: {
            moneyFlow: selectedMoneyFlow !== null ? selectedMoneyFlow : undefined,
            transactionType: selectedTransactionType !== null ? selectedTransactionType : undefined,
            formTime: selectedDateRange.from ? formatStartTime(selectedDateRange.from) : undefined,
            toTime: selectedDateRange.to ? formatEndTime(selectedDateRange.to) : undefined,
          },
        },
      },
    });
  }, [
    currentEvent,
    currentOrg,
    getBalanceTransactions,
    nextCursor,
    selectedDateRange.from,
    selectedDateRange.to,
    selectedMoneyFlow,
    selectedTransactionType,
  ]);

  const transactions = transactionsQueryData?.balanceTransactions?.balanceTransactions;
  const pageInfo = transactionsQueryData?.balanceTransactions?.pageInfo;

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

  const showLoadingIndicator = loadingTransactions || !transactions;
  const showPagingIndicator = loadingTransactions || !transactions || transactions.length === 0;

  return (
    <div className="flex flex-col mt-7">
      <TransactionTableHeader />
      <TransactionFilterBar
        selectedMoneyFlow={selectedMoneyFlow}
        selectedTransactionType={selectedTransactionType}
        setSelectedMoneyFlow={setSelectedMoneyFlow}
        setSelectedTransactionType={setSelectedTransactionType}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
      />
      {showLoadingIndicator && <Loader className="my-12" />}
      {!showLoadingIndicator && <TransactionTable transactions={transactions as Balance[]} className="mt-2" />}
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

function TransactionTableHeader() {
  const { formatMessage } = useIntl();
  return (
    <>
      <p className="font-semibold text-lg">{formatMessage({ id: 'payout.transactions' })}</p>
      <p className="font-normal text-base mb-4">{formatMessage({ id: 'payout.transactionsDes' })}</p>
    </>
  );
}

function TransactionTable({ transactions, className }: { transactions: Balance[]; className?: string }) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();

  const formatTransactionType = (transactionType: string) => {
    switch (transactionType) {
      case 'ORDER':
        return formatMessage({ id: 'payout.order' });
      case 'ORDER_FEE':
        return formatMessage({ id: 'payout.orderFee' });
      case 'PAYOUT':
        return formatMessage({ id: 'payout.payout' });
      case 'REFUND_ORDER':
        return formatMessage({ id: 'payout.refundOrder' });
      case 'REFUND_ORDER_FEE':
        return formatMessage({ id: 'payout.refundOrderFee' });
      case 'ADD_ON_SERVICE':
        return formatMessage({ id: 'payout.addOnService' });
      default:
        return transactionType;
    }
  };

  const formatTransactionMethod = (transactionMethod: Maybe<string> | undefined) => {
    switch (transactionMethod) {
      case 'bank-transfer':
      case 'virtual-account':
        return formatMessage({ id: 'payout.transfer' });
      case 'card':
        return formatMessage({ id: 'payout.card' });
      case 'system':
        return formatMessage({ id: 'payout.system' });
      default:
        return transactionMethod;
    }
  };

  const formatChannelCode = (channelCode: Maybe<string> | undefined) => {
    switch (channelCode) {
      case 'system':
        return formatMessage({ id: 'payout.system' });
      default:
        return channelCode;
    }
  };

  const TransactionTableHeader = ({ title, className }: { title: string; className?: string }) => {
    return <TableHead className={cn('text-foreground font-semibold text-sm py-3', className)}>{title}</TableHead>;
  };

  if (transactions.length === 0) {
    return <div className="text-center py-12">{formatMessage({ id: 'payout.noTransactions' })}</div>;
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TransactionTableHeader title={formatMessage({ id: 'payout.createdAt' })} />
          <TransactionTableHeader title={formatMessage({ id: 'payout.transactionType' })} />
          <TransactionTableHeader title={formatMessage({ id: 'payout.transactionMethod' })} />
          <TransactionTableHeader title={formatMessage({ id: 'payout.channel' })} />
          <TransactionTableHeader title={formatMessage({ id: 'payout.amount' })} />
          <TransactionTableHeader title={formatMessage({ id: 'payout.balanceSnapshot' })} />
          <TransactionTableHeader title={formatMessage({ id: 'payout.referenceId' })} />
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          const createdAt = stringToLuxonVN(transaction.created_at, locale);
          return (
            <TableRow key={transaction.id} className="h-12">
              <TableCell width={120}>
                {formatTime(createdAt, locale)}, {formatDate(createdAt, locale)}
              </TableCell>
              <TableCell width={150}>{formatTransactionType(transaction.transaction_type)}</TableCell>
              <TableCell width={150}>{formatTransactionMethod(transaction.transaction_method)}</TableCell>
              <TableCell width={150}>{formatChannelCode(transaction.channel_code)}</TableCell>
              <TableCell width={150}>
                <div className="font-medium flex flex-row gap-2 items-center">
                  {transaction.money_flow === 'IN' ? (
                    <span className="text-green-500">+{formatPrice(String(transaction.amount))}</span>
                  ) : (
                    <span className="text-red-500">-{formatPrice(String(transaction.amount))}</span>
                  )}
                </div>
              </TableCell>
              <TableCell width={150} className="font-medium">
                {formatPrice(String(transaction.event_wallet_amount_snapshot))}
              </TableCell>
              <TableCell width={350}>{transaction.reference_id}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const moneyFlowOptions = [
  { value: Balance_Transaction_Money_Flow_Enum.In, label: { id: 'payout.in' } },
  { value: Balance_Transaction_Money_Flow_Enum.Out, label: { id: 'payout.out' } },
];

const transactionTypeOptions = [
  { value: Balance_Transaction_Type_Enum.Order, label: { id: 'payout.order' } },
  { value: Balance_Transaction_Type_Enum.OrderFee, label: { id: 'payout.orderFee' } },
  { value: Balance_Transaction_Type_Enum.AddOnService, label: { id: 'payout.addOnService' } },
  { value: Balance_Transaction_Type_Enum.Payout, label: { id: 'payout.payout' } },
  { value: Balance_Transaction_Type_Enum.RefundOrder, label: { id: 'payout.refundOrder' } },
  { value: Balance_Transaction_Type_Enum.RefundOrderFee, label: { id: 'payout.refundOrderFee' } },
];

function TransactionFilterBar({
  selectedMoneyFlow,
  selectedTransactionType,
  setSelectedMoneyFlow,
  setSelectedTransactionType,
  selectedDateRange,
  setSelectedDateRange,
}: {
  selectedMoneyFlow: Balance_Transaction_Money_Flow_Enum | null;
  selectedTransactionType: Balance_Transaction_Type_Enum | null;
  setSelectedMoneyFlow: (option: Balance_Transaction_Money_Flow_Enum | null) => void;
  setSelectedTransactionType: (option: Balance_Transaction_Type_Enum | null) => void;
  selectedDateRange: DateRange;
  setSelectedDateRange: (date: DateRange) => void;
}) {
  const { formatMessage } = useIntl();

  const filterCount = [selectedMoneyFlow, selectedTransactionType].filter((x) => x !== null).length;
  const filterIsActive = filterCount > 0;

  const TransactionFilterDropdown = () => {
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
          <DropdownMenuLabel>{formatMessage({ id: 'payout.moneyFlow' })}</DropdownMenuLabel>
          {moneyFlowOptions.map((option) => {
            return (
              <DropdownMenuCheckboxItem
                checked={selectedMoneyFlow === option.value}
                onCheckedChange={() => {
                  if (selectedMoneyFlow === option.value) {
                    setSelectedMoneyFlow(null);
                  } else {
                    setSelectedMoneyFlow(option.value);
                  }
                }}
                key={option.value}
              >
                {formatMessage({ id: option.label.id })}
              </DropdownMenuCheckboxItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{formatMessage({ id: 'payout.transactionType' })}</DropdownMenuLabel>
          {transactionTypeOptions.map((option) => {
            return (
              <DropdownMenuCheckboxItem
                checked={selectedTransactionType === option.value}
                onCheckedChange={() => {
                  if (selectedTransactionType === option.value) {
                    setSelectedTransactionType(null);
                  } else {
                    setSelectedTransactionType(option.value);
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
  };

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      <TransactionFilterDropdown />
      <DateRangePicker
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={(dateRange) => {
          if (dateRange) {
            setSelectedDateRange(dateRange);
          }
        }}
      />
    </div>
  );
}
