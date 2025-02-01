import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { useIntl } from 'react-intl';
import { Button } from '@/components/shadcn/ui/button';

export function ConfirmDiscountDeletionDialog({ onConfirm }: { onConfirm: () => any }) {
  const { closeDialog } = useResponsiveDialog();
  const { formatMessage } = useIntl();

  return (
    <>
      <div className="flex flex-col">
        <p className="text-2xl font-medium">{formatMessage({ id: 'promotion.discount.deleteConfirmTitle' })}</p>
      </div>
      <div className="h6 font-normal mb-2">{formatMessage({ id: 'promotion.discount.deleteConfirmDescription' })}</div>
      <div className="flex flex-row gap-2">
        <Button
          className="w-28"
          size={'lg'}
          onClick={() => {
            onConfirm();
            closeDialog();
          }}
        >
          {formatMessage({ id: 'promotion.discount.deleteConfirmButton' })}
        </Button>
        <Button className="w-28" size={'lg'} variant={'outline'} onClick={closeDialog}>
          {formatMessage({ id: 'promotion.discount.deleteCancelButton' })}
        </Button>
      </div>
    </>
  );
}
