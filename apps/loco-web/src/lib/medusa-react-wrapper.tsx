'use client';

import FixedLoader from '@/components/loading-indicator/FixedLoader';
import { firebaseAuth } from '@/lib/firebase';
import { QueryClient } from '@tanstack/react-query';
import { CartProvider, MedusaProvider } from 'medusa-react';
import { useEffect, useState } from 'react';

type MedusaReactWrapperProps = {
  children: React.ReactNode;
};

export const MedusaReactWrapper = ({ children }: MedusaReactWrapperProps) => {
  const [customHeaders, setCustomHeaders] = useState<{ Authorization: string }>();
  const [loading, setLoading] = useState(true);

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: (failureCount: number, error: TODO) => {
          if (error.response?.status === 401 && failureCount <= 1) {
            if (failureCount === 0) {
              firebaseAuth.currentUser?.getIdToken(true);
            }

            return true;
          }

          return false;
        },
      },

      queries: {
        retry: (failureCount: number, error: TODO) => {
          console.log({ error, failureCount });
          if (error.response?.status === 401 && failureCount <= 2) {
            if (failureCount === 0) {
              firebaseAuth.currentUser?.getIdToken(true);
            }

            return true;
          }

          return failureCount <= 2;
        },
      },
    },
  });

  useEffect(() => {
    const setToken = async () => {
      const token = await firebaseAuth.currentUser?.getIdToken();
      if (token) {
        setCustomHeaders({ Authorization: `Bearer ${token}` });
      }
      setLoading(false);
    };
    setToken();

    // When user just login and stay in the whole session
    // Use onIdTokenChanged to make sure the accessToken is always up to date
    const unsubscribe = firebaseAuth.onIdTokenChanged((user) => {
      user?.getIdToken().then((accessToken) => {
        setLoading(true);
        setCustomHeaders({ Authorization: `Bearer ${accessToken}` });
        setLoading(false);
      });
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <FixedLoader />;
  }

  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={process.env.NEXT_PUBLIC_TICKETING_PATH || ''}
      customHeaders={customHeaders}
    >
      <CartProvider>{children}</CartProvider>
    </MedusaProvider>
  );
};
