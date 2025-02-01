'use client';

import FixedLoader from '@/components/loading-indicator/FixedLoader';
import { CART_PAYMENT_SUCCEEDED_PREFIX } from '@/lib/utils/constants';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentsVerification() {
  const searchParams = useSearchParams();
  const verificationId = searchParams.get('verification_id');
  useEffect(() => {
    if (verificationId) {
      localStorage.setItem(`${CART_PAYMENT_SUCCEEDED_PREFIX}${verificationId}`, 'true');
    }
  }, [verificationId]);

  return <FixedLoader />;
}
