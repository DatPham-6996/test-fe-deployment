import FileGenerationDialog from '@/components/file-generation/FileGenerationDialog';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { useReportStatusLazyQuery, useRequestPayoutReportMutation } from '@/lib/__generated__/graphql';
import { toastSuccess } from '@/lib/utils/toast';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import classNames from 'classnames';
import { FileDownIcon, FileIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilValue } from 'recoil';

export default function PayoutReportExportButton() {
  const { formatMessage } = useIntl();
  const { openDialog } = useResponsiveDialog();

  return (
    <Button
      variant="secondary"
      className="gap-1 h-12"
      size={'default'}
      onClick={() => openDialog(<PayoutReportExportContainer />)}
    >
      <FileDownIcon className="w-5 h-5" />
      {formatMessage({ id: 'payout.export.buttonTitle' })}
    </Button>
  );
}

function PayoutReportExportContainer() {
  const { closeDialog } = useResponsiveDialog();
  const { formatMessage } = useIntl();
  const event = useRecoilValue(currentEventState);
  const org = useRecoilValue(currentOrgState);
  const [reportId, setReportId] = useState<string>('');

  if (!event || !org) {
    throw new Error('Event or organization not found');
  }

  const [requestPayoutReportMutation] = useRequestPayoutReportMutation({
    variables: {
      input: {
        eventId: event.id,
        organizationId: org.id,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const [getReportStatus] = useReportStatusLazyQuery({
    variables: {
      input: {
        reportId,
        eventId: event.id,
        organizationId: org.id,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const onInitialize = useCallback(async () => {
    const { data } = await requestPayoutReportMutation();
    const reportId = data?.requestPayoutReport.reportId;
    if (!reportId) {
      throw new Error('Report ID not found.');
    }
    setReportId(reportId);
  }, [requestPayoutReportMutation]);

  const onProgress = useCallback(async () => {
    const { data } = await getReportStatus();
    const reportStatus = data?.reportStatus;
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
