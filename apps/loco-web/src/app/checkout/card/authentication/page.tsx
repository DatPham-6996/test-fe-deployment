'use client';

import FixedLoader from '@/components/loading-indicator/FixedLoader';
import { CARD_VERIFICATION_PREFIX } from '@/lib/utils/constants';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CardAuthentication() {
  const searchParams = useSearchParams();
  const verificationId = searchParams.get('verification_id');
  useEffect(() => {
    if (verificationId) {
      localStorage.setItem(`${CARD_VERIFICATION_PREFIX}${verificationId}`, 'true');
    }
  }, [verificationId]);

  return <FixedLoader />;
}
