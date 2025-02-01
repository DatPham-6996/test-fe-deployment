'use client';

import { useAuth } from '@/state-management/hooks/useAuth';
import Intercom from '@intercom/messenger-js-sdk';
import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

const secretKey = 'uAwNVNQnHDpPuVdQancr56Y_ZlhPKxgaMHt-djMj';

export default function IntercomWrapper({ children }: Props) {
  const { currentUser: firebaseUser } = useAuth();
  const { email, uid, displayName, metadata } = firebaseUser ?? {};

  useEffect(() => {
    let option = {};
    if (uid) {
      option = {
        custom_launcher_selector: '#intercom-custom-launcher',
        user_id: uid,
        name: displayName || '',
        email: email || '',
        created_at: Number(metadata?.creationTime),
      };
    }

    Intercom({
      app_id: process.env.NEXT_PUBLIC_INTERCOM_APP || 'omr1iqd2',
      ...option
    });
  }, [uid]);


  return (
    <>
      {children}
    </>
  );
}
