'use client';

import Loader from '@/components/loading-indicator/Loader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table';
import {
  Discount,
  Discount_Rule_Allocation_Enum,
  Discount_Rule_Type_Enum,
  Maybe,
  useDeleteDiscountMutation,
  useDiscountsLazyQuery,
} from '@/lib/__generated__/graphql';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { ReactNode, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';

import { formatTimeAndDate, stringToLuxonVN } from '@/lib/utils/time-format';
import { useLocale } from '@/locale/intl-provider-wrapper';

import { PayoutPagingIndicator } from '@/app/organizer/payout/components/PayoutPagingIndicator';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils/format';
import { EllipsisVerticalIcon, PencilIcon, PlusIcon, TicketIcon, TrashIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import { ConfirmDiscountDeletionDialog } from '../components/ConfirmDiscountDeletionDialog';
import { DiscountEditorDialog, DiscountEditorDialogMode } from '../components/DiscountEditorDialog';
import { toastError } from '@/lib/utils/toast';
export default function DiscountListingContainer() {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();
  const currentEvent = useRecoilValue(currentEventState);
  const currentOrg = useRecoilValue(currentOrgState);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextCursor, setNextCursor] = useState<string>('');
  const [previousCursors, setPreviousCursors] = useState<Map<number, string>>(new Map());
  const [getdiscounts, { data: discountsData, loading: loadingData }] = useDiscountsLazyQuery({
    fetchPolicy: 'network-only',
  });

  const [deleteDiscount] = useDeleteDiscountMutation();
  const { openDialog } = useResponsiveDialog();

  useEffect(() => {
    if (!currentEvent || !currentOrg) {
      return;
    }

    getdiscounts({
      variables: {
        input: {
          eventId: currentEvent?.id ?? '',
          organizationId: currentOrg?.id ?? '',
          take: 10,
          cursor: nextCursor !== '' ? { id: nextCursor } : undefined,
        },
      },
    });
  }, [currentEvent, currentOrg, getdiscounts, nextCursor]);

  const discounts = discountsData?.discounts.results;
  const pageInfo = discountsData?.discounts.pageInfo;

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

  const handleRemoveDiscount = async (discountId: string) => {
    if (!currentEvent || !currentOrg) {
      throw new Error('Current event or current organization is not set');
    }

    const eventId = currentEvent?.id ?? '';
    const organizationId = currentOrg?.id ?? '';

    openDialog(
      <ConfirmDiscountDeletionDialog
        onConfirm={async () => {
          try {
            await deleteDiscount({
              variables: {
                input: {
                  discountId,
                  eventId,
                  organizationId,
                },
              },
            });

            getdiscounts({
              variables: {
                input: {
                  eventId,
                  organizationId,
                  take: 10,
                  cursor: nextCursor !== '' ? { id: nextCursor } : undefined,
                },
              },
            });
          } catch (error) {
            console.error('[DiscountListingContainer] Failed to delete discount:', error);
            toastError(formatMessage({ id: 'common.error' }));
          }
        }}
      />
    );
  };

  const onRefresh = () => {
    getdiscounts({
      variables: {
        input: {
          eventId: currentEvent?.id ?? '',
          organizationId: currentOrg?.id ?? '',
          take: 10,
          cursor: nextCursor !== '' ? { id: nextCursor } : undefined,
        },
      },
    });
  };

  const handleEditDiscount = (discountId: string) => {
    const discount = discounts?.find((discount) => discount.id === discountId);

    if (!discount) {
      throw new Error('Discount not found');
    }

    openDialog(
      <DiscountEditorDialog
        mode={DiscountEditorDialogMode.Edit}
        onRefresh={onRefresh}
        data={{
          id: discount.id,
          code: discount.code,
          type: discount.discount_rule?.type === Discount_Rule_Type_Enum.Percentage ? 'percentage' : 'fixed',
          value: discount.discount_rule?.value ?? 0,
          allocation: discount.discount_rule?.allocation === Discount_Rule_Allocation_Enum.Total ? 'total' : 'item',
          enableUsageLimit: discount.usage_limit && discount.usage_limit > 0 ? true : false,
          usageLimit: discount.usage_limit ?? undefined,
          startDate: stringToLuxonVN(discount.starts_at, locale).toJSDate(),
          endDate: discount.ends_at ? stringToLuxonVN(discount.ends_at, locale).toJSDate() : undefined,
          isDisabled: discount.is_disabled,
        }}
      />
    );
  };

  const EmptyDiscountHolder = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className=" mb-4">
          <TicketIcon className="w-24 h-24 stroke-gray-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{formatMessage({ id: 'promotion.discount.emptyTitle' })}</h2>
        <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
          {formatMessage({ id: 'promotion.discount.emptyDescription' })}
        </p>
      </div>
    );
  };

  const discountIsEmpty = !loadingData && (!discounts || discounts.length === 0);
  const showLoadingIndicator = loadingData || !discounts;
  const showPagingIndicator = !discountIsEmpty && !showLoadingIndicator;

  const DiscountListingBody = () => {
    if (showLoadingIndicator) {
      return <Loader className="my-12" />;
    }
    if (discountIsEmpty) {
      return <EmptyDiscountHolder />;
    }

    return (
      <DiscountTable
        discounts={discounts as Discount[]}
        className="mt-2"
        onRemove={handleRemoveDiscount}
        onEdit={handleEditDiscount}
      />
    );
  };

  const CreateDiscountButton = () => {
    return (
      <Button
        onClick={() =>
          openDialog(<DiscountEditorDialog mode={DiscountEditorDialogMode.Create} onRefresh={onRefresh} />)
        }
      >
        <div className="flex flex-row gap-1 items-center">
          <PlusIcon size={20} strokeWidth={2} />
          <span className="text-sm font-semibold">{formatMessage({ id: 'promotion.discount.createVoucher' })}</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between my-5">
        <h1 className="text-[34px] font-semibold grow">{formatMessage({ id: 'promotion.title' })}</h1>
        <CreateDiscountButton />
      </div>
      <DiscountListingBody />
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

function DiscountTable({
  discounts,
  className,
  onRemove,
  onEdit,
}: {
  discounts: Discount[];
  className?: string;
  onRemove: (discountId: string) => void;
  onEdit: (discountId: string) => void;
}) {
  const { formatMessage } = useIntl();
  const { locale } = useLocale();

  const DiscountTableHead = ({ title, className }: { title: string; className?: string }) => {
    return <TableHead className={cn('text-foreground font-semibold text-sm py-3', className)}>{title}</TableHead>;
  };

  if (!discounts || discounts.length === 0) {
    return <div className="text-center py-12">{formatMessage({ id: 'payout.noTransactions' })}</div>;
  }

  const formatDiscountType = (type: string) => {
    switch (type) {
      case 'percentage':
        return formatMessage({ id: 'promotion.discount.typePercent' });
      case 'fixed':
        return formatMessage({ id: 'promotion.discount.typeFlat' });
      default:
        return '';
    }
  };

  const formatDiscountValue = (value: number, type: string) => {
    if (type === 'percentage') {
      return `${value}%`;
    }
    return formatPrice(value.toString());
  };

  const formatDiscountUsage = (usageLimit: Maybe<number> | undefined) => {
    if (usageLimit) {
      return `${usageLimit}`;
    }

    return formatMessage({ id: 'promotion.discount.unlimited' });
  };

  function formatDiscountDuration(startAt: DateTime | null, endAt: DateTime | null) {
    if (startAt && !endAt) {
      return `${formatMessage({ id: 'promotion.discount.from' })} ${formatTimeAndDate(startAt, locale)}`;
    }

    if (startAt && endAt) {
      return (
        <div className="flex flex-col gap-2">
          <p>{`${formatMessage({ id: 'promotion.discount.from' })} ${formatTimeAndDate(startAt, locale)}`}</p>
          <p>{`${formatMessage({ id: 'promotion.discount.to' })} ${formatTimeAndDate(endAt!, locale)}`}</p>
        </div>
      );
    }

    return '';
  }

  function formatDiscountActiveStatus(isDisabled: boolean): ReactNode {
    if (isDisabled) {
      return (
        <div className="flex flex-row gap-2 items-center">
          <div className="h-3 w-3 bg-gray-400 rounded-full" />
          <span className="text-sm font-normal">
            {formatMessage({ id: 'promotion.discount.activeStatus.disabled' })}
          </span>
        </div>
      );
    }
    return (
      <div className="flex flex-row gap-2 items-center">
        <div className="h-3 w-3 bg-green-500 rounded-full" />
        <span className="text-sm font-normal">{formatMessage({ id: 'promotion.discount.activeStatus.enabled' })}</span>
      </div>
    );
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.codeLabel' })} />
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.typeLabel' })} />
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.valueLabel' })} />
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.usageCountLabel' })} />
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.usageLimitLabel' })} />
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.durationLabel' })} />
          <DiscountTableHead title={formatMessage({ id: 'promotion.discount.activeLabel' })} />
          <DiscountTableHead title="" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {discounts.map((discount) => {
          const discountType = discount.discount_rule?.type ?? '';
          const discountValue = discount.discount_rule?.value ?? 0;
          const startsAt = discount.starts_at ? stringToLuxonVN(discount.starts_at, locale) : null;
          const endsAt = discount.ends_at ? stringToLuxonVN(discount.ends_at, locale) : null;

          return (
            <TableRow key={discount.id} className="h-12">
              <TableCell width={150}>{discount.code}</TableCell>
              <TableCell width={100}>{formatDiscountType(discountType)}</TableCell>
              <TableCell width={100}>{formatDiscountValue(discountValue, discountType)}</TableCell>
              <TableCell width={100}>{discount.usage_count}</TableCell>
              <TableCell width={150}>{formatDiscountUsage(discount.usage_limit)}</TableCell>
              <TableCell width={200}>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-normal">{formatDiscountDuration(startsAt, endsAt)}</div>
                  {/* <div>{formatDiscountDurationStatus(startsAt, endsAt)}</div> */}
                </div>
              </TableCell>
              <TableCell width={150}>{formatDiscountActiveStatus(discount.is_disabled)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'}>
                      <EllipsisVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36" align="end">
                    <DropdownMenuItem onClick={() => onEdit(discount.id)}>
                      <PencilIcon className="w-4 h-4 mr-2" />
                      <span>{formatMessage({ id: 'promotion.discount.edit' })}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onRemove(discount.id)}>
                      <TrashIcon className="w-4 h-4 mr-2" />
                      <span>{formatMessage({ id: 'promotion.discount.delete' })}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
