import { FLIP_QR_LOGO_URL } from '@/lib/utils/constants';
import { displaySeatId } from '@/lib/utils/seatmap';
import { toTimeRangeFormat } from '@/lib/utils/time-format';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { useIntl } from 'react-intl';
import { AddToCalendarButton } from '../AddToCalendar';
import { Button } from '../shadcn/ui/button';
import { Separator } from '../shadcn/ui/separator';

type TicketProps = {
  ticketCode: string;
  eventName: string;
  eventId: string;
  ownerName: string;
  ticketType: string;
  address: string;
  startAt: string;
  endAt: string;
  status: string;
  pdfURL?: string;
  seatId?: string;
  sectionName?: string;
  nextButton: React.ReactNode;
  prevButton: React.ReactNode;
};

export const Ticket = ({
  status,
  ticketCode,
  eventName,
  eventId,
  ownerName,
  ticketType,
  startAt,
  endAt,
  address,
  pdfURL,
  seatId,
  sectionName,
  nextButton,
  prevButton,
}: TicketProps) => {
  const { formatMessage } = useIntl();
  const TicketHeader = () => (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-semibold">{eventName}</p>
      <p className="text-sm font-light">{toTimeRangeFormat(startAt, endAt)}</p>
      {address && <p className="text-sm font-light">{address}</p>}
    </div>
  );
  const QRCodeSize = 154;
  const logoSize = 40;
  const QRCode = () => (
    <div className="flex items-center flex-col px-5 py-4 gap-1">
      <div>
        <QRCodeSVG
          value={ticketCode}
          size={QRCodeSize}
          marginSize={1}
          level={'M'}
          imageSettings={{
            src: FLIP_QR_LOGO_URL,
            height: logoSize,
            width: logoSize,
            excavate: false,
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-center">
          {formatMessage({ id: 'ticket.ticketCode' })}: <span className="font-bold">{ticketCode}</span>
        </p>
      </div>
    </div>
  );

  const TicketDivider = () => (
    <div className="relative">
      <div>
        <Separator
          className="!bg-transparent border-2 border-dashed border-neutral-300 border-t-1 border-l-0 border-r-0 border-b-0"
          orientation="horizontal"
        />
      </div>
    </div>
  );

  const SeatInfo = () => {
    if (!seatId) {
      if (!sectionName) {
        return null;
      }

      return (
        <div className="flex flex-row w-full place-content-between">
          <div className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground">
              {formatMessage({ id: 'seatReservation.section' }).toUpperCase() +
                ` (${formatMessage({ id: 'seatReservation.generalAdmission' }).toUpperCase()})`}
            </p>
            <p className="text-sm font-medium">{sectionName || '-'}</p>
          </div>
        </div>
      );
    }

    const displaySeat = displaySeatId(seatId);

    return (
      <div className="flex flex-row w-full place-content-between">
        <div className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            {formatMessage({ id: 'seatReservation.section' }).toUpperCase()}
          </p>
          <p className="text-sm font-medium">{sectionName || '-'}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground">{formatMessage({ id: 'seatReservation.row' }).toUpperCase()}</p>
          <p className="text-sm font-medium">{displaySeat.row}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-muted-foreground">
            {formatMessage({ id: 'seatReservation.position' }).toUpperCase()}
          </p>
          <p className="text-sm font-medium">{displaySeat.position}</p>
        </div>
      </div>
    );
  };

  const TicketBody = () => (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{formatMessage({ id: 'ticket.name' })}</p>
          <p className="text-sm font-medium">{ownerName}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{formatMessage({ id: 'ticket.status' })}</p>
          <p className="text-sm font-medium">{status}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-muted-foreground">{formatMessage({ id: 'ticket.ticketType' })}</p>
          <p className="text-sm font-medium">{ticketType}</p>
        </div>
      </div>

      <div className="flex justify-between">
        <SeatInfo />
      </div>
    </div>
  );

  function getDirectionLink(locationName: string) {
    const formattedLocationName = encodeURIComponent(locationName);
    const directionLink = `https://www.google.com/maps/dir/?api=${process.env.NEXT_PUBLIC_GMAP_KEY}&destination=${formattedLocationName}`;
    return directionLink;
  }

  const handleDirectionClick = () => {
    window.open(getDirectionLink(address), '_blank');
  };

  const Buttons = () => (
    <div className="mt-3">
      <AddToCalendarButton className="w-full mt-2" event={{ id: eventId, name: eventName, startAt, endAt, address }} />
      <Button className="w-full mt-2" onClick={handleDirectionClick}>
        {formatMessage({ id: 'ticket.map' })}
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col">
        <TicketHeader />
      </div>

      <div className="py-4">
        <TicketDivider />
        <div className="flex justify-between items-center gap-4">
          {prevButton}
          <QRCode />
          {nextButton}
        </div>
        <TicketDivider />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-center w-full italic">
          {formatMessage({ id: 'ticket.protectTicket' })}
        </p>
        <TicketBody />
        <Buttons />
      </div>
    </div>
  );
};
