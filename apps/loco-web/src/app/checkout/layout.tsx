'use client';

import { useAuth } from '@/state-management/hooks/useAuth';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, openLoginModal } = useAuth();

  if (!isLoggedIn) {
    openLoginModal();
    return <></>;
  }

  return children;
}
