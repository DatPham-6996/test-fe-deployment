import { useMutation } from '@tanstack/react-query';
import { useCompleteCart } from 'medusa-react';
import PQueue from 'p-queue';

export const PAYMENT_NOT_AUTHORIZED_YET_ERROR_MESSAGE = 'payment-not-authorized-yet';
export const RESERVATION_SESSION_ERROR_MESSAGE = 'reservation-session-error';

const queue = new PQueue({ concurrency: 1 });

export function useCompleteCartWithRetry(cartId: string) {
  const { mutateAsync: completeCart } = useCompleteCart(cartId);

  return useMutation({
    mutationFn: async () => {
      try {
        // This is to avoid calling the complete cart function multiple times simultaneously in a browser tab.
        const res = await queue.add(async () => completeCart(), { throwOnTimeout: true, timeout: 15000 });

        if (res.type === 'cart') {
          throw new Error(PAYMENT_NOT_AUTHORIZED_YET_ERROR_MESSAGE);
        }

        if (res.type === 'swap') {
          throw new Error('Swap order is not supported');
        }

        return res;
      } catch (error) {
        if ((error as TODO)?.response?.data?.message?.toLowerCase().includes('reservation session')) {
          throw new Error(RESERVATION_SESSION_ERROR_MESSAGE);
        }

        throw error;
      }
    },
    retry: 2,
    retryDelay: 500,
  });
}
