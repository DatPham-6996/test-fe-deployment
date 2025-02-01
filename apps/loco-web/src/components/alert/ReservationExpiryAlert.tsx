import { useIntl } from 'react-intl';
import { TimerPause } from '../icon/TimerPause';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { Button } from '../shadcn/ui/button';

type ReservationExpiryAlertProps = {
  open: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function ReservationExpiryAlert({ open, onClick }: ReservationExpiryAlertProps) {
  const { formatMessage } = useIntl();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="py-14 px-8 max-w-[400px]">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-20 h-20 p-5 bg-red-100 rounded-[46.67px] border-8 border-red-50 justify-center items-center inline-flex mb-3">
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <div className="w-10 h-10 relative">
                <TimerPause size={40} className="stroke-red-500" />
              </div>
            </div>
          </div>
          <AlertDialogTitle className="text-xl font-semibold my-1">
            {formatMessage({ id: 'checkout.reservation.sessionExpired' })}
          </AlertDialogTitle>
          <AlertDialogDescription className="my-1 text-center">
            {formatMessage({ id: 'checkout.reservation.sessionExpiredDes' })}
          </AlertDialogDescription>
        </div>

        <div className="flex justify-center mt-1">
          <Button size="lg" onClick={onClick}>
            {formatMessage({ id: 'checkout.reservation.bookOtherTickets' })}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
