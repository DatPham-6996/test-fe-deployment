'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type PaymentModalContextType = {
  open: boolean;
  openPaymentModal: () => void;
  closePaymentModal: () => void;
};

const PaymentModalContext = createContext<PaymentModalContextType>({
  open: false,
  openPaymentModal: () => {},
  closePaymentModal: () => {},
});

export const usePaymentModal = () => useContext(PaymentModalContext);

export function PaymentModalProvider({ children }: { children: React.ReactNode }) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);

  const memoedValue = useMemo(
    () => ({ open: isPaymentModalOpen, closePaymentModal, openPaymentModal }),
    [isPaymentModalOpen]
  );

  return <PaymentModalContext.Provider value={memoedValue}>{children}</PaymentModalContext.Provider>;
}
