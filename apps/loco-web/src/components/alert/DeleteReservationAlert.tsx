import { calculateReservationSessionTime } from '@/lib/utils/reservation-session';
import { format } from 'date-fns';
import { TicketIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { Button } from '../shadcn/ui/button';

type DeleteReservationAlertProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  reservationSession:
    | {
        expireAt: any;
        bufferTimeMs: number;
        cartId: string;
      }
    | null
    | undefined;
};

export function DeleteReservationAlert({ open, onConfirm, onCancel, reservationSession }: DeleteReservationAlertProps) {
  const { formatMessage } = useIntl();
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    if (!reservationSession) {
      return;
    }

    setTimeRemaining(
      Math.round(
        calculateReservationSessionTime({
          expireAt: reservationSession.expireAt,
          bufferTimeMs: reservationSession.bufferTimeMs,
        }) * 60
      )
    );
  }, [reservationSession]);

  useEffect(() => {
    if (!reservationSession) {
      return;
    }

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        return;
      }

      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [reservationSession, timeRemaining]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="py-6 px-6 max-w-[350px] rounded-md">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-20 h-20 p-5 bg-orange-100 rounded-[46.67px] border-8 border-orange-50 justify-center items-center inline-flex mb-3">
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <div className="w-10 h-10 relative">
                <TicketIcon size={40} className="stroke-orange-500" />
              </div>
            </div>
          </div>
          <AlertDialogTitle className="text-xl font-semibold text-center">
            {formatMessage({ id: 'seatReservation.existingReservation' })}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {formatMessage({ id: 'seatReservation.existingReservationDes' })}{' '}
            {/* <p className="font-semibold">{formatMessage({ id: 'seatReservation.deleteReservationNotice' })}</p> */}
          </AlertDialogDescription>
        </div>

        <div className="flex flex-col justify-center gap-3 mt-4">
          <Button className="flex flex-1" onClick={onCancel} disabled={timeRemaining <= 0}>
            {formatMessage({ id: 'seatReservation.backToReservation' })} {`(${format(timeRemaining * 1000, 'mm:ss')})`}
          </Button>
          <Button onClick={onConfirm} className="flex flex-1" variant="outline">
            {formatMessage({ id: 'seatReservation.deleteReservation' })}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
