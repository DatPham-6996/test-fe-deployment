import { LocationData } from '@/state-management/hooks/ghn';
import { getTicketingAgentWithAuth } from '../../agents/ticketing-agent';

type ShippingAddressCreatePayload = {
  name: string;
  address: string;
  phone: string;
  city: LocationData;
  ward: LocationData;
  district: LocationData;
};

export const addShippingAddress = async (payload: ShippingAddressCreatePayload) => {
  const ticketingAgentWithAuth = await getTicketingAgentWithAuth();
  const res = await ticketingAgentWithAuth.post('/store/customers/me/addresses', {
    address: {
      first_name: payload.name,
      last_name: '',
      address_1: payload.address,
      city: payload.city.id,
      country_code: 'VN',
      postal_code: '',
      phone: payload.phone,
      metadata: {
        city: {
          id: payload.city.id,
          name: payload.city.name,
        },
        ward: {
          id: payload.ward.id,
          name: payload.ward.name,
        },
        district: {
          id: payload.district.id,
          name: payload.district.name,
        },
        street: payload.address,
      },
    },
  });
  return res;
};
