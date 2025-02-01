import { useIntl } from 'react-intl';
import { TimerPause } from '../icon/TimerPause';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { Button } from '../shadcn/ui/button';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { useState } from 'react';
import { Trash2Icon } from 'lucide-react';

type SeatClearanceAlertProps = {
  onConfirm: () => void;
};

export function SeatClearanceAlert({ onConfirm }: SeatClearanceAlertProps) {
  const { formatMessage } = useIntl();
  const [openSeatClearanceAlert, setOpenSeatClearanceAlert] = useState(false);

  return (
    <AlertDialog open={openSeatClearanceAlert}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-500 text-base font-medium"
          onClick={() => {
            setOpenSeatClearanceAlert(true);
          }}
        >
          {formatMessage({ id: 'seatReservation.clearAll' })}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="py-6 px-6 max-w-[350px] rounded-md">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-20 h-20 p-5 bg-red-100 rounded-[46.67px] border-8 border-red-50 justify-center items-center inline-flex mb-3">
            <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
              <div className="w-10 h-10 relative">
                <Trash2Icon size={40} className="stroke-red-500" />
              </div>
            </div>
          </div>
          <AlertDialogTitle className="text-xl font-semibold">
            {formatMessage({ id: 'seatReservation.clearAllSeats' })}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {formatMessage({ id: 'seatReservation.clearAllSeatsDescription' })}
          </AlertDialogDescription>
        </div>

        <div className="flex flex-row justify-center gap-3 mt-4">
          <Button onClick={onConfirm} className="flex flex-1">
            {formatMessage({ id: 'seatReservation.clearAll' })}
          </Button>
          <Button
            className="flex flex-1"
            variant="outline"
            onClick={() => {
              setOpenSeatClearanceAlert(false);
            }}
          >
            {formatMessage({ id: 'seatReservation.cancel' })}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
