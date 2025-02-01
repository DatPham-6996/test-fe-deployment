import { ReactNode } from 'react';

import { useIntl } from 'react-intl';
import { Button } from '../shadcn/ui/button';
import { useResponsiveDialog } from './responsive-dialog-context';

export function ConfirmationDialog({
  action,
  content,
  actionText,
  actionVariant = 'secondary',
}: {
  action: () => void;
  content?: ReactNode;
  actionText?: string;
  actionVariant?: string;
}) {
  const { closeDialog } = useResponsiveDialog();
  const intl = useIntl();
  const actionLabel = actionText ?? intl.formatMessage({ id: 'confirmation.continue' });
  const contentText = content ?? intl.formatMessage({ id: 'confirmation.content' });
  return (
    <div className="flex flex-col gap-8 pt-7">
      <p className="font-medium">{contentText}</p>
      <div className="flex justify-end gap-2">
        <Button onClick={closeDialog} className="min-w-32">
          {intl.formatMessage({ id: 'confirmation.cancel' })}
        </Button>
        <Button
          className="min-w-32"
          onClick={() => {
            action();
            closeDialog();
          }}
          variant={actionVariant as any}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}
