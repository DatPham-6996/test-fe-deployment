import { useCheckoutInfo } from '@/app/checkout/[handle]/[cartId]/components/hook/useCheckoutInfo';
import { QrCodeIcon, TicketIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

type ETicketProps = {
  type: 'e-ticket';
};

type PhysicalTicketProps = {
  type: 'physical-ticket';
  date: string;
};

type TicketTypeInfoProps = ETicketProps | PhysicalTicketProps;

export function TicketTypeInfo(props: TicketTypeInfoProps) {
  const { email } = useCheckoutInfo();
  const intl = useIntl();
  return (
    <div className="flex gap-2 items-start">
      <div>{props.type === 'e-ticket' ? <QrCodeIcon size={26} /> : <TicketIcon size={26} />}</div>
      <div className="flex flex-col gap-1.5">
        <p className="!leading-5 font-medium">
          {props.type === 'e-ticket'
            ? intl.formatMessage({ id: 'checkout.ticketType.eTicket' })
            : intl.formatMessage({ id: 'checkout.ticketType.physicalTicket' })}
        </p>
        <p className="text-muted-foreground text-sm">
          {props.type === 'e-ticket' ? (
            <span>
              {intl.formatMessage({ id: 'checkout.ticketType.eTicketNote1' })}{' '}
              <span className="font-bold">{email}</span>{' '}
              {intl.formatMessage({ id: 'checkout.ticketType.eTicketNote2' })}{' '}
              <span className="font-bold">{intl.formatMessage({ id: 'checkout.ticketType.myTickets' })}</span>
            </span>
          ) : (
            `${intl.formatMessage({ id: 'checkout.ticketType.physicalTicketNote' })} ${props.date}`
          )}
        </p>
      </div>
    </div>
  );
}
