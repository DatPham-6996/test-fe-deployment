import DateRangePicker from '@/components/date-picker';
import DatePicker from '@/components/date-picker';
import FileGenerationDialog from '@/components/file-generation/FileGenerationDialog';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import {
  useOrganizationReportStatusLazyQuery,
  useReportStatusLazyQuery,
  useRequestOrderReportMutation,
  useRequestOrganizationInvoiceReportMutation,
  useRequestOrganizationPayoutReportMutation,
} from '@/lib/__generated__/graphql';
import { toastSuccess } from '@/lib/utils/toast';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { useCallback, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';

export default function OrganizationInvoiceReportExportContainer() {
  const { closeDialog } = useResponsiveDialog();
  const { formatMessage } = useIntl();
  const org = useRecoilValue(currentOrgState);
  const [reportId, setReportId] = useState<string>('');
  const [filterTimeRange, setFilterTimeRange] = useState<DateRange | undefined>();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();

  if (!org) {
    throw new Error('Organization not found');
  }

  const [requestInvoiceReportMutation, { loading: requestInvoiceReportLoading }] =
    useRequestOrganizationInvoiceReportMutation({
      variables: {
        input: {
          organizationId: org.id,
          from: filterTimeRange?.from?.toISOString(),
          to: filterTimeRange?.to?.toISOString(),
        },
      },
      fetchPolicy: 'no-cache',
    });

  const [getReportStatus] = useOrganizationReportStatusLazyQuery({
    variables: {
      input: {
        reportId,
        organizationId: org.id,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const onInitialize = useCallback(async () => {
    if (requestInvoiceReportLoading) {
      return;
    }
    const { data } = await requestInvoiceReportMutation();
    const reportId = data?.requestOrganizationInvoiceReport.reportId;
    if (!reportId) {
      throw new Error('Report ID not found.');
    }
    setReportId(reportId);
  }, [requestInvoiceReportLoading, requestInvoiceReportMutation]);

  const onProgress = useCallback(async () => {
    const { data } = await getReportStatus();
    const reportStatus = data?.organizationReportStatus;
    if (reportStatus?.status === 'COMPLETED') {
      return reportStatus.downloadUrl;
    }
    return null;
  }, [getReportStatus]);

  const onCancel = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  const onSuccess = useCallback(() => {
    closeDialog();
    toastSuccess(formatMessage({ id: 'payout.export.success' }));
  }, [closeDialog, formatMessage]);

  if (!filterTimeRange) {
    return (
      <>
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
          {formatMessage({ id: 'payout.export.organizationInvoiceTitle' })}
        </h1>
        <p className="text-base text-foreground mb-4 sm:mb-0">
          <span>{formatMessage({ id: 'payout.export.organizationInvoiceDescription' })}</span>
        </p>
        <DateRangePicker
          selectedDateRange={selectedDateRange}
          setSelectedDateRange={(dateRange) => {
            setSelectedDateRange(dateRange);
          }}
          className="w-full mb-20 sm:mb-2"
          buttonClassName="w-full h-14"
          label={formatMessage({ id: 'payout.export.organizationInvoiceSelectTimeRange' })}
        />
        <Button
          className="w-full h-12"
          disabled={!selectedDateRange}
          onClick={() => {
            if (!selectedDateRange || !selectedDateRange?.from || !selectedDateRange?.to) {
              return;
            }

            if (selectedDateRange.from.getTime() === selectedDateRange.to.getTime()) {
              setFilterTimeRange({
                from: selectedDateRange.from,
                to: new Date(selectedDateRange.to.setHours(23, 59, 59, 999)),
              });
            } else {
              setFilterTimeRange(selectedDateRange);
            }
          }}
        >
          {formatMessage({ id: 'payout.export.buttonTitle' })}
        </Button>
      </>
    );
  }

  return (
    <FileGenerationDialog
      title={formatMessage({ id: 'payout.export.title' })}
      description={formatMessage({ id: 'payout.export.description' })}
      timeoutInSeconds={120}
      checkIntervalInSeconds={2}
      onInitialize={onInitialize}
      onProgress={onProgress}
      onCancel={onCancel}
      onSuccess={onSuccess}
    />
  );
}
