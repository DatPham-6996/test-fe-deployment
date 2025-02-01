export const getCartPaymentUpdateEventSource = (params: { cartId: string }) => {
  const { cartId } = params;
  return new EventSource(`${process.env.NEXT_PUBLIC_TICKETING_PATH}/store/carts/payments?cartId=${cartId}`);
};
