import { getTicketingAgentWithAuth } from '../../agents/ticketing-agent';

type RequestBody = {
  accountNumber: string;
  accountName: string;
  bankName: string;
  description: string;
  amount: string;
};

type PaymentQRCodeResponse = {
  qrDataURL: string;
};

export const generatePaymentQRCode = async (data: RequestBody): Promise<PaymentQRCodeResponse> => {
  const ticketingAgentWithAuth = await getTicketingAgentWithAuth();
  const res = await ticketingAgentWithAuth.post('/store/qr/generate', data);
  return res.data;
};
