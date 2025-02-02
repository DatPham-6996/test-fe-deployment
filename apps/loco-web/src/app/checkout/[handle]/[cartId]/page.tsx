'use client';

import { ReservationExpiryAlert } from '@/components/alert/ReservationExpiryAlert';
import { ReservationInvalidAlert } from '@/components/alert/ReservationInvalidAlert';
import { InBrowserWarning } from '@/components/call-out/InBrowserWarning';
import { Card, CardBody, CardHeader } from '@/components/card';
import EventInfoRow from '@/components/event/EventInfoRow';
import Loader from '@/components/loading-indicator/Loader';
import { Payments } from '@/components/payments';
import { PaymentInfo, PaymentMethod } from '@/components/payments/type';
import RefundPolicy from '@/components/refund/RefundPolicy';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Checkbox } from '@/components/shadcn/ui/checkbox';
import { Separator } from '@/components/shadcn/ui/separator';
import { TicketTypeInfo } from '@/components/ticket-type-info';
import { Timers } from '@/components/timers';
import CartInfo from '@/containers/cart/CartInfo';
import OrganizationOptions from '@/containers/cart/OrganizationOptions';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipLayout } from '@/containers/flip-layout';
import { ReceiverInformation } from '@/containers/receiver-information/ReceiverInformation';
import {
  CartMetadataInput,
  EventStatus,
  FlipEvent,
  useEventDetailsQuery,
  useGetReservationSessionQuery,
} from '@/lib/__generated__/graphql';
import { getCartPaymentUpdateEventSource } from '@/lib/api/event-source/cart-payment-status';
import { getReservationSessionUpdateEventSource } from '@/lib/api/event-source/reservation-session-update';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { isInAppBrowser } from '@/lib/utils/client-utils';
import { CART_PAYMENT_SUCCEEDED_PREFIX, DiscountCodeType } from '@/lib/utils/constants';
import { calculateReservationSessionTime } from '@/lib/utils/reservation-session';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useCompleteCartWithRetry } from '@/state-management/hooks/useCompleteCartWithRetry';
import { PaymentModalProvider } from '@/state-management/hooks/usePaymentModal';
import { datadogLogs } from '@datadog/browser-logs';
import type { Cart, PaymentSession } from '@medusajs/medusa';
import { useDynamicConfig, useGateValue } from '@statsig/react-bindings';
import classNames from 'classnames';
import capitalize from 'lodash.capitalize';
import { useCreatePaymentSession, useGetCart, useMeCustomer, useSetPaymentSession } from 'medusa-react';
import { useRouter } from 'next-nprogress-bar';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { PaymentButton } from './components/PaymentButton';
import { CheckoutInfoProvider } from './components/hook/useCheckoutInfo';

type PaymentAction = {
  action: 'AUTH';
  method: string;
  qrCode: string | null;
  url: string | null;
  urlType: 'WEB' | 'MOBILE';
};

type VirtualAccountPaymentMethod = {
  virtualAccount: {
    amount: number;
    currency: string;
    channelCode: string;
    channelProperties: {
      expiresAt: string;
      customerName: string;
      virtualAccountNumber: string;
    };
  };
};

type PaymentStatus = 'SUCCEEDED' | 'FAILED';

/**
 * TODO:
 * 1. If the tier has physical ticket, we need to update shipping address in the cart
 */
export default function CheckoutPage() {
  const intl = useIntl();
  const { openDialog, closeDialog } = useResponsiveDialog();
  const router = useRouter();
  const params = useParams();
  let { handle } = params;
  const cartId = params.cartId as string;
  const [openReservationExpiryAlert, setOpenReservationExpiryAlert] = useState(false);
  const [isOpenReservationInvalidAlert, setIsOpenReservationInvalidAlert] = useState(false);
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const { mutateAsync: createPaymentSession } = useCreatePaymentSession(cartId);
  const { mutateAsync: setPaymentSession } = useSetPaymentSession(cartId);
  const [modelPaymentLoading, setModelPaymentLoading] = useState(false);
  const [_forceRerender, setForceRerender] = useState(0);
  const { data, loading } = useEventDetailsQuery({
    variables: {
      handle: handle as string,
    },
  });
  const { customer } = useMeCustomer({ refetchOnWindowFocus: false });
  const {
    data: reservationSession,
    loading: reservationSessionLoading,
    refetch: refetchReservation,
  } = useGetReservationSessionQuery({
    variables: { input: { cartId } },
    fetchPolicy: 'no-cache',
  });
  const { logEvent } = useLogEvent();
  const bypassPaymentGate = useGateValue('flip_prod_test');

  const event: FlipEvent = useMemo(() => (data?.event as FlipEvent) || {}, [data?.event]);

  const openReservationInvalidAlert = useCallback(() => {
    closeDialog();
    if (!openReservationExpiryAlert) {
      setIsOpenReservationInvalidAlert(true);
    }
  }, [closeDialog, openReservationExpiryAlert]);

  datadogLogs.logger.info('[Flip] Check out', { user: customer ? customer.email : 'anonymous' });

  const refetchReservationSession = useCallback(async () => {
    try {
      await refetchReservation();
    } catch (error) {
      openReservationInvalidAlert();
    }
  }, [refetchReservation, openReservationInvalidAlert]);

  useEffect(() => {
    if (!reservationSessionLoading && !reservationSession) {
      openReservationInvalidAlert();
      return;
    }

    if (!reservationSessionLoading && reservationSession?.getReservationSession?.isCartCompleted) {
      router.replace(`/checkout/status/${handle}/${cartId}`);
      return;
    }
  }, [reservationSessionLoading, reservationSession, openReservationInvalidAlert, router, handle, cartId]);

  useEffect(() => {
    if (!customer?.id || !event?.id) {
      return;
    }

    const reservationSessionUpdateEventSource = getReservationSessionUpdateEventSource({
      userId: customer.id,
      eventId: event.id,
    });

    reservationSessionUpdateEventSource.onmessage = (event) => {
      const reservationSession: { cartId: string } = JSON.parse(event.data);
      if (cartId !== reservationSession?.cartId) {
        openReservationInvalidAlert();
      }
    };

    // Cleanup function to close the connection when the component unmounts
    return () => reservationSessionUpdateEventSource.close();
  }, [customer, event, cartId, openReservationInvalidAlert]);

  useEffect(() => {
    if (!cartId) {
      return;
    }

    const cartPaymentUpdateEventSource = getCartPaymentUpdateEventSource({
      cartId,
    });

    cartPaymentUpdateEventSource.onmessage = (event) => {
      const payment: { status: PaymentStatus } = JSON.parse(event.data);
      if (payment.status === 'SUCCEEDED') {
        sessionStorage.setItem(`${CART_PAYMENT_SUCCEEDED_PREFIX}${cartId}`, 'true');
        toastSuccess(intl.formatMessage({ id: 'payment.notification.completeTransferSuccessfully' }), {
          toastId: 'completeTransferSuccessfully',
        });
        router.replace(`/checkout/status/${handle}/${cartId}`);
      }
    };

    // Cleanup function to close the connection when the component unmounts
    return () => cartPaymentUpdateEventSource.close();
  }, [cartId, router, handle, intl]);

  useEffect(() => {
    // Timer will disable in inactive tabs
    // so we need to re-rerender to keep the timer up-to-date.
    const rerender = async () => {
      setForceRerender(Date.now());
      refetchReservationSession();
    };
    window.addEventListener('focus', rerender);
    return () => window.removeEventListener('focus', rerender);
  }, [refetchReservationSession]);

  useEffect(() => {
    logEvent({
      eventName: 'checkout_viewed',
      value: cartId,
      eventID: event?.id,
      organizationID: event?.organization?.id,
      metadata: { cartId },
    });
  }, [cartId, event?.id, event?.organization?.id, logEvent]);

  const {
    cart,
    isLoading: isCartLoading,
    isSuccess: isCartSuccess,
    refetch: refetchCart,
  } = useGetCart(cartId, { refetchOnWindowFocus: false });

  const { mutateAsync: completeCart } = useCompleteCartWithRetry(cartId);

  const isOfflineSale = cart?.discounts && cart.discounts.some((d) => d.type === DiscountCodeType.OFFLINE_SALE_CODE);

  const isFreeOrder = !isCartLoading && cart?.total === 0;
  const canBypassPayment = (bypassPaymentGate && isFreeOrder) || isOfflineSale;

  const handlePaymentError = useCallback(() => {
    toastError(intl.formatMessage({ id: 'payment.notification.paymentError' }));
  }, [intl]);

  const handleVirtualAccountPayment = useCallback(
    async (paymentSession: PaymentSession): Promise<PaymentInfo> => {
      const { virtualAccount } = (paymentSession?.data?.paymentMethod as VirtualAccountPaymentMethod) ?? {};
      if (!virtualAccount) {
        throw new Error('Virtual account not found');
      }

      const {
        channelCode,
        channelProperties: { virtualAccountNumber: accountNumber, customerName: accountName },
        amount,
      } = virtualAccount;

      const bankName = capitalize(channelCode);

      const cartDisplayId = (cart as TODO)?.display_id ?? cartId;

      return {
        paymentMethod: 'virtual-account',
        cartDisplayId,
        cartId,
        bankName,
        accountNumber,
        accountName,
        amount: String(amount),
      };
    },
    [cart, cartId]
  );

  const handleMomoPayment = useCallback(
    (paymentSession: PaymentSession): PaymentInfo => {
      const actions: PaymentAction[] = (paymentSession?.data.actions as PaymentAction[]) || [];
      const action = actions.find((item) => item.urlType === 'WEB');
      const paymentUrl = action?.url ?? '';

      return { paymentMethod: 'momo', paymentUrl, cartId };
    },
    [cartId]
  );

  const handleCardPayment = useCallback(async (): Promise<PaymentInfo> => {
    return { paymentMethod: 'card', cartId };
  }, [cartId]);

  const executePaymentBypass = useCallback(async () => {
    setModelPaymentLoading(true);
    setPaymentSubmitting(true);
    await completeCart();
    setModelPaymentLoading(false);
    refetchReservationSession();
  }, [completeCart, refetchReservationSession]);

  const onPaymentClick = async (payment: PaymentInfo): Promise<void> => {
    try {
      logEvent({
        eventName: 'checkout',
        value: cartId,
        eventID: event?.id,
        organizationID: event?.organization?.id,
        metadata: { cartId, paymentMethod: payment.paymentMethod },
      });

      switch (payment.paymentMethod) {
        case 'momo':
          router.replace(`/checkout/status/${handle}/${cartId}`);
          break;

        case 'virtual-account':
          router.replace(`/checkout/status/${handle}/${cartId}`);
          break;

        case 'card':
          router.replace(`/checkout/status/${handle}/${cartId}`);
          break;

        default:
          break;
      }
    } catch (error: any) {
      handlePaymentError();
    }
  };

  const onSelectPaymentMethod = useCallback(
    async (paymentMethod: PaymentMethod): Promise<PaymentInfo | undefined> => {
      if (canBypassPayment) {
        executePaymentBypass();
        return;
      }

      if (paymentMethod !== 'virtual-account' && isInAppBrowser()) {
        openDialog(
          <InBrowserWarning
            title={intl.formatMessage({ id: 'operation.warningInAppBrowser1' })}
            message={intl.formatMessage({ id: 'operation.warningInAppBrowser2' })}
          />
        );
        return;
      }
      try {
        logEvent({
          eventName: 'select_payment_method',
          value: paymentMethod,
          event: event,
          metadata: { cartId, paymentMethod },
        });

        refetchReservationSession();
        await createPaymentSession();

        const {
          cart: { payment_session: paymentSession },
        } = await setPaymentSession({ provider_id: paymentMethod });

        if (!paymentSession) {
          throw new Error('Payment session not found');
        }

        switch (paymentMethod) {
          case 'momo':
            return handleMomoPayment(paymentSession);

          case 'virtual-account':
            return handleVirtualAccountPayment(paymentSession);

          case 'card':
            return handleCardPayment();

          default:
            break;
        }
      } catch (error: any) {
        toastError(intl.formatMessage({ id: 'payment.notification.paymentMethodNotAvailable' }));
      }
    },
    [
      canBypassPayment,
      executePaymentBypass,
      openDialog,
      intl,
      logEvent,
      event,
      cartId,
      refetchReservationSession,
      createPaymentSession,
      setPaymentSession,
      handleMomoPayment,
      handleVirtualAccountPayment,
      handleCardPayment,
    ]
  );

  const onTimerExpire = () => {
    if (!reservationSession?.getReservationSession?.isCartCompleted) {
      closeDialog();
      if (!isOpenReservationInvalidAlert) {
        setOpenReservationExpiryAlert(true);
      }
    }
  };

  const toReservation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  const excludePaymentMethodsConfig = useDynamicConfig('exclude_payment_methods');
  const excludePaymentMethods: PaymentMethod[] = excludePaymentMethodsConfig.get(
    'exclude',
    process.env.NEXT_PUBLIC_ENV === 'production' ? ['manual'] : []
  ) as PaymentMethod[];

  const timer = (
    <>
      {reservationSessionLoading && <Timers minutes={0} />}
      {!reservationSessionLoading && (
        <Timers
          minutes={calculateReservationSessionTime({
            expireAt: reservationSession?.getReservationSession.expireAt,
            bufferTimeMs: reservationSession?.getReservationSession.bufferTimeMs,
          })}
          callback={onTimerExpire}
        />
      )}
    </>
  );
  const ReservationTimerDesktop = (
    <Card className="sm:static md:relative">
      <div className="flex flex-col justify-center items-center">
        <p className="mt-1 text-sm">{intl.formatMessage({ id: 'checkout.reservation.ticketReserving' })}</p>
        <div className="mt-3">{timer}</div>
      </div>
    </Card>
  );

  const ReservationTimerMobile = (
    <Card className="sticky top-0 z-10 py-3 px-8">
      <div className="flex flex-row justify-between items-baseline gap-3">
        <p className="text-sm">{intl.formatMessage({ id: 'checkout.reservation.ticketReserving' })}</p>
        <div>{timer}</div>
      </div>
    </Card>
  );

  const [isReceiverInfoValid, setIsReceiverInfoValid] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(true);

  return (
    <FlipLayout>
      <CheckoutInfoProvider
        initial={{
          email: (cart?.metadata as CartMetadataInput)?.emailForTicket ?? customer?.email ?? '',
          displayName: (cart?.metadata as CartMetadataInput)?.userDisplayNameForTicket ?? customer?.first_name ?? '',
          phone: (cart?.metadata as CartMetadataInput)?.userPhoneForTicket ?? customer?.phone ?? '',
        }}
        loading={isCartLoading}
      >
        <PaymentModalProvider>
          {isMobile && ReservationTimerMobile}
          <ContentCenterNarrow>
            <div className="container mx-auto px-3 md:px-0">
              <div className="flex flex-col md:flex-row mt-3 sm:gap-x-3 gap-y-3 justify-center">
                {/* Left Content */}
                <div className="flex flex-col gap-3 flex-[1.4]" style={{ gridColumn: '1 / 3' }}>
                  <div className="w-full">
                    <EventInfoRow
                      handle={event.handle}
                      image={event.media?.[0]?.url || ''}
                      title={event.name}
                      start={event.startAt}
                      end={event.endAt}
                      address={event.address?.address || ''}
                      className="!w-full rounded-xl"
                      size="medium"
                    />
                  </div>
                  <div>{cart?.id && (
                    <ReceiverInformation
                      cartId={cart?.id}
                      onValidationChange={setIsReceiverInfoValid}
                    />
                  )}</div>

                  {!isCartLoading && cart && (
                    <OrganizationOptions
                      cart={cart as Cart}
                      loadingCart={isCartLoading}
                      refetchCart={refetchCart}
                      eventId={event.id}
                      organizationId={event.organization.id}
                    />
                  )}

                  <Card
                    className={classNames({
                      'grayscale pointer-events-none opacity-30': isFreeOrder,
                    })}
                  >
                    <CardHeader title={intl.formatMessage({ id: 'payment.method' })} />
                    <CardBody>
                      <Payments
                        excludePaymentMethods={excludePaymentMethods}
                        onPaymentClick={onPaymentClick}
                        onSelectPaymentMethod={onSelectPaymentMethod}
                        setModelPaymentLoading={setModelPaymentLoading}
                        forceClosePaymentModal={openReservationExpiryAlert || isOpenReservationInvalidAlert}
                      />
                    </CardBody>
                  </Card>
                </div>

                {/* Right Content */}
                <div className="flex flex-col gap-3 flex-1">
                  {!isMobile && ReservationTimerDesktop}
                  <RefundPolicy policy={event.policy} />

                  <Card>
                    <CardBody>
                      {loading ? (
                        <Loader />
                      ) : (
                        <>
                          <div className="flex flex-col gap-4">
                            <CartInfo
                              cart={cart as Cart}
                              loadingCart={isCartLoading}
                              successCart={isCartSuccess}
                              hasSeatMap={event.hasSeatMap}
                              eventId={event.id}
                              organizationId={event.organization.id}
                              refetchCart={refetchCart}
                            />

                            <div className="flex gap-2 items-top">
                              <div>
                                <Checkbox checked={agreeTerm} id="terms" onClick={() => setAgreeTerm(!agreeTerm)} />
                              </div>
                              <label
                                htmlFor="terms"
                                className="text-sm"
                              >
                                {intl.formatMessage({ id: 'checkout.validation.termAgreement' })}
                              </label>
                            </div>
                            <PaymentButton
                              loading={modelPaymentLoading || paymentSubmitting}
                              disabled={
                                (isFreeOrder && !canBypassPayment) ||
                                !isReceiverInfoValid ||
                                !agreeTerm
                              }
                              isDemoEvent={event.status === EventStatus.Demo}
                              onDone={() => {
                                setModelPaymentLoading(false);
                                setPaymentSubmitting(false);
                              }}
                            />

                            {isFreeOrder && !canBypassPayment && (
                              <p className="text-destructive text-sm">
                                {intl.formatMessage({ id: 'checkout.discount.freeOrderIsNotSupported' })}
                              </p>
                            )}

                            {!isReceiverInfoValid && (
                              <p className="text-destructive text-sm">
                                {intl.formatMessage({ id: 'checkout.validation.receiverInfoInvalid' })}
                              </p>
                            )}

                            <Separator orientation="horizontal" />
                            <TicketTypeInfo type="e-ticket" />
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
            <ReservationExpiryAlert open={openReservationExpiryAlert} onClick={toReservation} />
            <ReservationInvalidAlert open={isOpenReservationInvalidAlert} onClick={toReservation} />
          </ContentCenterNarrow>
        </PaymentModalProvider>
      </CheckoutInfoProvider>
    </FlipLayout>
  );
}
