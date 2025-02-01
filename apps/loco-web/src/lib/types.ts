export type MediaCollection = {
  cover: string;
};

export type TicketColor = 'pink' | 'blue' | 'yellow' | 'red';

export type TicketTierItem = {
  label: string;
  value: string;
  price: string;
  color?: TicketColor;
};

export type EventItem = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  ticketTypes: Array<'e-ticket' | 'physical-ticket'>;
  priceRange?: [number, number];
  ticketTiers: TicketTierItem[];
  reservationTypes: Array<'seat-reservation' | 'gerenal-admission'>;
  datetime: {
    date: string;
    startEndTimes: [string, string];
  };
  location: {
    city: string;
    venue: string;
    address: string;
  };
  user: {
    id: string;
    handle: string;
    name: string;
    avatar: string;
  };
  organizer: {
    id: string;
    handle: string;
    name: string;
    avatar: string;
  };
};

export type SeatDisplay = {
  id: string;
  position: string;
  row: string;
  section: string;
};

export type SectionDisplay = {
  id: string;
};
