import { Cart } from '@medusajs/medusa';
import { useMutation } from '@tanstack/react-query';
import { useCompleteCart } from 'medusa-react';
import PQueue from 'p-queue';

export const ORDER_IN_CART_IS_DEPRECATED_ERROR_MESSAGE = 'order-in-cart-is-deprecated';
export const SWAP_ORDER_NOT_SUPPORTED_ERROR_MESSAGE = 'swap-order-not-supported';
export const RESERVATION_SESSION_ERROR_MESSAGE = 'reservation-session-error';
export const PAYMENT_NOT_AUTHORIZED_YET_ERROR_MESSAGE = 'payment-not-authorized-yet';

const queue = new PQueue({ concurrency: 1 });

export function useCompleteCartWithRetry(cartId: string) {
  const { mutateAsync: completeCart } = useCompleteCart(cartId);

  return useMutation({
    mutationFn: async () => {
      try {
        // This is to avoid calling the complete cart function multiple times simultaneously in a browser tab.
        let res = await queue.add(async () => completeCart(), { throwOnTimeout: true, timeout: 15000 });

        if (res.type === 'order') {
          throw new Error(ORDER_IN_CART_IS_DEPRECATED_ERROR_MESSAGE);
        }

        if (res.type === 'swap') {
          throw new Error(SWAP_ORDER_NOT_SUPPORTED_ERROR_MESSAGE);
        }

        //TODO: switch 'cart' to 'data' on flip-ticketing-v1 to match medusa sdk.
        if ('cart' in res) {
          res.data = res.cart as Cart;
        }

        if (!res.data.payment_authorized_at) {
          throw new Error(PAYMENT_NOT_AUTHORIZED_YET_ERROR_MESSAGE);
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
