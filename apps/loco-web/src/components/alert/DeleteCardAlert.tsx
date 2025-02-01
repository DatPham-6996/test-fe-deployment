import { useIntl } from 'react-intl';
import { isDesktop } from 'react-device-detect';
import { Button } from '../shadcn/ui/button';
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@/components/shadcn/ui/dialog';
import { Drawer, DrawerContent, DrawerOverlay } from '@/components/shadcn/ui/drawer';
import { RedTrash } from '../icon/RedTrash';
import { useState } from 'react';
import { toastError } from '@/lib/utils/toast';

type ReservationExpiryAlertProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: () => {};
  maskCardNumber: string;
};

export function DeleteCardAlert({ setOpen, open, onSubmit, maskCardNumber }: ReservationExpiryAlertProps) {
  const { formatMessage } = useIntl();
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async () => {
    try {
      setSubmitting(true);
      await onSubmit();
      setSubmitting(false);
      setOpen(false);
    } catch (error) {
      setSubmitting(false);
      toastError(formatMessage({ id: 'common.error' }));
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogTitle />
          <RedTrash size={50} />
          <div className="mb-5 flex-col">
            <h1 className="text-2xl font-semibold mt-2 mb-3">{formatMessage({ id: 'payment.card.deleteCard' })}</h1>
            <span className=" text-base font-normal">
              {formatMessage({ id: 'payment.card.deleteCardDes' })}
              <span className="font-semibold">{maskCardNumber}</span>
            </span>
          </div>
          <div className="flex">
            <Button className="w-full mr-1" loading={submitting} onClick={submitHandler}>
              {formatMessage({ id: 'payment.card.delete' })}
            </Button>
            <Button className="w-full ml-1" onClick={() => setOpen(false)} variant="outline" disabled={submitting}>
              {formatMessage({ id: 'payment.card.cancel' })}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="max-w-[425px] p-5 pb-12 mx-auto w-full">
        <RedTrash size={50} />
        <div className="mb-5 flex-col">
          <h1 className="text-2xl font-semibold mt-2 mb-3">{formatMessage({ id: 'payment.card.deleteCard' })}</h1>
          <span className="text-base font-normal">
            {formatMessage({ id: 'payment.card.deleteCardDes' })}
            <span className="font-semibold">{maskCardNumber}</span>
          </span>
        </div>
        <div className="flex">
          <Button className="w-full mr-1" loading={submitting} onClick={submitHandler}>
            {formatMessage({ id: 'payment.card.delete' })}
          </Button>
          <Button className="w-full ml-1" onClick={() => setOpen(false)} variant="outline" disabled={submitting}>
            {formatMessage({ id: 'payment.card.cancel' })}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
