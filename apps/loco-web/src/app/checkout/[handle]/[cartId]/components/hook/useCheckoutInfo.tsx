import React, { useEffect, useMemo, useState } from 'react';

interface CheckoutInfoContextType {
  email: string;
  displayName: string;
  phone: string | null | undefined;
  setEmail: (email: string) => void;
  setDisplayName: (displayName: string) => void;
  setPhone: (phone: string | null) => void;
  loading: boolean;
}
export const CheckoutInfoContext = React.createContext<CheckoutInfoContextType | undefined>(undefined);

export function CheckoutInfoProvider({
  children,
  initial,
  loading,
}: {
  children: React.ReactNode;
  initial: { email: string; displayName: string; phone: string | null };
  loading: boolean;
}) {
  const [email, setEmail] = useState<string>(initial.email);
  const [phone, setPhone] = useState<string | null | undefined>(initial.phone);
  const [displayName, setDisplayName] = useState<string>(initial.displayName);

  useEffect(() => {
    if (!loading) {
      if (!email) setEmail(initial.email);
      if (!displayName) setDisplayName(initial.displayName);
      if (!phone) setPhone(initial.phone);
    }
  }, [initial, email, displayName, phone, loading]);

  const memoedValue = useMemo(
    () => ({
      email,
      phone,
      displayName,
      setEmail,
      setDisplayName,
      setPhone,
      loading
    }),
    [email, phone, displayName, loading]
  );
  return <CheckoutInfoContext.Provider value={memoedValue}>{children}</CheckoutInfoContext.Provider>;
}

export const useCheckoutInfo = (): CheckoutInfoContextType => {
  const context = React.useContext(CheckoutInfoContext);
  if (!context) {
    throw new Error('useCheckoutInfo must be used within a CheckoutInfoProvider');
  }

  return context;
};
