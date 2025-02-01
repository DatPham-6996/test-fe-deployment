'use client';
import { Ticket } from '@/components/ticket/Ticket';
import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Loader from '../loading-indicator/Loader';
import { Dialog, DialogContent } from '../shadcn/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

type Ticket = {
  ticketCode: string;
  eventName: string;
  eventId: string;
  ownerName: string;
  ticketType: string;
  address: string;
  status: string;
  checkedInBy: string;
  startAt: string;
  endAt: string;
  seatId?: string;
  sectionName?: string;
};

type TicketModalProps = {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  tickets?: Ticket[];
};

export const TicketModal = ({ open, loading = false, onClose, tickets = [] }: TicketModalProps) => {
  const [currentTicket, setCurrentTicket] = useState(0);
  const isLastTicket = currentTicket === tickets.length - 1;
  const isFirstTicket = currentTicket === 0;
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => previous(),
  });

  const next = () => {
    if (!isLastTicket) setCurrentTicket(currentTicket + 1);
  };
  const previous = () => {
    if (!isFirstTicket) setCurrentTicket(currentTicket - 1);
  };

  const onCloseClick = () => {
    setCurrentTicket(0);
    if (open) onClose();
  };

  const PrevButton =
    !loading && !isFirstTicket ? (
      <div
        onClick={previous}
        className={
          'w-10 h-10 flex flex-row p-1 justify-center items-center bg-neutral-400 border border-white rounded-full cursor-pointer md:!flex'
        }
      >
        <ArrowLeftIcon className="stroke-white" />
      </div>
    ) : (
      <div className="w-10 h-10" />
    );

  const NextButton =
    !loading && !isLastTicket ? (
      <div
        onClick={next}
        className={classNames(
          'w-10 h-10 flex flex-row p-1 justify-center items-center bg-neutral-400 border border-white rounded-full cursor-pointer md:!flex',
          {
            '!visibility-hidden': isLastTicket,
          }
        )}
      >
        <ArrowRightIcon className="stroke-white" />
      </div>
    ) : (
      <div className="w-10 h-10" />
    );

  const ticket = tickets[currentTicket];

  const TicketView = (
    <div className="flex items-center justify-center w-full bg-red" {...swipeHandlers}>
      {loading ? (
        <Loader size={10} />
      ) : (
        ticket && (
          <Ticket
            ticketCode={ticket.ticketCode}
            eventName={ticket.eventName}
            eventId={ticket.eventId}
            ownerName={ticket.ownerName}
            ticketType={ticket.ticketType}
            startAt={ticket.startAt}
            endAt={ticket.endAt}
            address={ticket.address}
            status={ticket.status}
            seatId={ticket.seatId}
            sectionName={ticket.sectionName}
            nextButton={NextButton}
            prevButton={PrevButton}
          />
        )
      )}
    </div>
  );

  const TicketCountIndicator = tickets.length > 1 && (
    <div className="flex justify-center">
      <div className="flex-col  gap-1 bg-neutral-950 opacity-70  rounded-2xl justify-center items-center inline-flex">
        <p className="text-center text-yellow-400 text-sm font-medium px-3 py-0.5">
          {currentTicket + 1}/{tickets.length}
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onCloseClick}>
      <DialogContent
        className="sm:max-w-[400px] rounded-3xl"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle />
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col min-w-[250px] gap-4 p-2 pt-8">
            {TicketView}
            {TicketCountIndicator}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // return (
  //   <Drawer open={open} onClose={onCloseClick}>
  //     <DrawerContent>
  //       <div className="flex flex-col w-full max-w-[425px] p-6 pb-6 mx-auto gap-4">
  //         {TicketView}
  //         {TicketCountIndicator}
  //       </div>
  //     </DrawerContent>
  //   </Drawer>
  // );
};
