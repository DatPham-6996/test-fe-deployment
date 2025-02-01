import { TicketModal } from '@/components/ticket/TicketModal';
import { useGetTicketTiersLazyQuery, useTicketDetailsQuery } from '@/lib/__generated__/graphql';
import { useEffect } from 'react';

type TicketDetailsModalProps = {
  ticketIds: string[];
  isOpen: boolean;
  onClose: () => void;
};

export default function TicketModalContainer({ ticketIds, isOpen, onClose }: TicketDetailsModalProps) {
  const { data, loading } = useTicketDetailsQuery({
    variables: {
      data: {
        ticketIds: ticketIds,
      },
    },
  });

  const [getTicketTiers, { data: ticketTiersData }] = useGetTicketTiersLazyQuery();

  useEffect(() => {
    if (!data) return;

    const eventId = data.getTicketDetails[0].event.id;
    getTicketTiers({
      variables: {
        data: {
          eventId: eventId,
        },
      },
    });
  }, [getTicketTiers, ticketTiersData, data]);

  const tickets = data?.getTicketDetails ?? [];
  const ticketTiers = ticketTiersData?.getTicketTiers;

  if (ticketIds.length === 0) return null;

  function getTicketType(ticket: any) {
    if (!ticketTiers) return '';

    const seatTier =
      ticket.metadata?.metadata?.seatTier ??
      ticket.metadata?.metadata?.sectionTier ??
      ticket.metadata?.metadata?.tierId ??
      ticket.metadata?.id;

    return ticketTiers.find((tier) => tier.id === seatTier)?.name ?? '';
  }

  return (
    <TicketModal
      tickets={tickets.map((ticket: any) => {
        return {
          status: ticket.status,
          checkedInBy: ticket.checkedInBy,
          qrCode: ticket.QRCodeUrl,
          ticketCode: ticket.validationCode,
          eventName: ticket.event.name,
          eventId: ticket.eventId,
          ownerName: ticket.owner?.displayName,
          ticketType: getTicketType(ticket),
          startAt: ticket.event.startAt,
          endAt: ticket.event.endAt,
          address: ticket.event.address?.address,
          seatId: ticket.metadata?.metadata?.seatId,
          sectionName: ticket.sectionName,
        };
      })}
      loading={loading}
      open={isOpen}
      onClose={onClose}
    />
  );
}
