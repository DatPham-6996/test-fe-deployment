// "manual" is only existing in local and development environment via "NEXT_PUBLIC_ENV"
export type PaymentMethod = 'card' | 'virtual-account' | 'momo' | 'manual';

export type PaymentsProps = {
  onPaymentClick: () => void;
  paymentInfo?: PaymentInfo;
};

export type MomoPaymentInfo = {
  paymentMethod: 'momo';
  paymentUrl: string;
  cartId: string;
};

export type CardPaymentInfo = {
  paymentMethod: 'card';
  cartId: string;
};

export type VirtualAccountPaymentInfo = {
  paymentMethod: 'virtual-account';
  cartDisplayId: string;
  cartId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: string;
  qrCode?: string | undefined;
};

export type PaymentInfo = MomoPaymentInfo | VirtualAccountPaymentInfo | CardPaymentInfo;
