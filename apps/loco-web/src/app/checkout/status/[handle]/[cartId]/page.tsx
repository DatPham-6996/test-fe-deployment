'use client';
import { EventInfoCard } from '@/components/event/EventInfoCard';
import { OutlinedCheck } from '@/components/icon';
import { OutlinedError } from '@/components/icon/OutlinedError';
import { Button } from '@/components/shadcn/ui/button';
import { Card } from '@/components/shadcn/ui/card';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipLayout } from '@/containers/flip-layout';
import { FlipEvent, Maybe, useEventStatusQuery } from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { MediaCollection } from '@/lib/types';
import { toastError } from '@/lib/utils/toast';
import {
  RESERVATION_SESSION_ERROR_MESSAGE,
  useCompleteCartWithRetry,
} from '@/state-management/hooks/useCompleteCartWithRetry';
import { selectedEntitiesState } from '@/state-management/seatmap/atoms/selected-entities-state';
import { selectedSeatsState } from '@/state-management/seatmap/atoms/selected-seats-state';
import classNames from 'classnames';
import { useRouter } from 'next-nprogress-bar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';
import { useResetRecoilState } from 'recoil';

const CHECK_ICON_SIZE = 24;

/**
 * After the user has successfully completed the checkout process
 * Xendit will be redirected to this page.
 * This page will complete the cart
 */
export default function Status() {
  const intl = useIntl();
  const params = useParams();
  const router = useRouter();
  const { handle } = params;
  const cartId = params.cartId as string;
  const [cartStatus, setCartStatus] = useState<'completed' | 'error'>();

  const {
    data: completeCartRes,
    mutate: completeCart,
    isLoading: isCompleteCartExecuting,
  } = useCompleteCartWithRetry(cartId);

  const { logEvent } = useLogEvent();

  const { data: eventDetail, loading: isEventLoading } = useEventStatusQuery({
    variables: {
      handle: handle as string,
    },
  });

  const event = eventDetail?.event;

  const resetSelectedSeats = useResetRecoilState(selectedSeatsState(event?.id ?? ''));
  const resetSelectedEntities = useResetRecoilState(selectedEntitiesState(event?.id ?? ''));

  useEffect(() => {
    resetSelectedSeats();
    resetSelectedEntities();
  }, [resetSelectedSeats, resetSelectedEntities]);

  useEffect(() => {
    completeCart(void 0, {
      onSuccess: ({ data }) => {
        setCartStatus('completed');
      },
      onError: (error: TODO) => {
        if (error.message === RESERVATION_SESSION_ERROR_MESSAGE) {
          setCartStatus('error');
          toastError(intl.formatMessage({ id: 'postCheckout.reservationSessionError' }));
          return;
        }

        setCartStatus('error');
        toastError(intl.formatMessage({ id: 'payment.notification.paymentError' }));
      },
    });
  }, [cartId, completeCart, intl]);

  useEffect(() => {
    if (eventDetail && cartStatus === 'completed' && completeCartRes?.data) {
      const data = completeCartRes.data;
      logEvent({
        eventName: 'order_completed',
        value: data.id,
        event: eventDetail?.event as Maybe<FlipEvent>,
        metadata: { cartId, orderId: data.id, eventId: eventDetail.event.id },
      });
    }
  }, [cartStatus, eventDetail, logEvent, cartId, completeCartRes]);

  const isLoading = isCompleteCartExecuting || isEventLoading || !cartStatus;

  const renderLoading = () => {
    return (
      <div className="flex flex-col items-center">
        <ClipLoader />
      </div>
    );
  };

  const getCoverPhoto = () => {
    if (event) {
      const mediaCollection = event?.mediaCollection as MediaCollection;
      if (mediaCollection?.cover && event?.media && event?.media.length) {
        return event?.media.find((item: { id: string }) => mediaCollection.cover === item.id);
      }
    }
    return null;
  };

  const renderCartCompletionIcon = () => {
    switch (cartStatus) {
      case 'completed':
        return (
          <div className="bg-green-50 rounded-full p-2">
            <div className="bg-green-100 rounded-full p-2">
              <OutlinedCheck size={CHECK_ICON_SIZE} className="stroke-green-600" />
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="bg-red-50 rounded-full p-2">
            <div className="bg-red-100 rounded-full p-2">
              <OutlinedError className="stroke-red-500" />
            </div>
          </div>
        );
    }
  };

  const renderCartCompletionTitle = (quantity: number) => {
    switch (cartStatus) {
      case 'completed':
        return intl.formatMessage({ id: 'postCheckout.bookSuccessfullyTickets' }, { quantity });

      case 'error':
        return intl.formatMessage({ id: 'postCheckout.orderFailedToComplete' });
    }
  };

  const renderCartCompletionDescription = () => {
    switch (cartStatus) {
      case 'completed':
        return intl.formatMessage({ id: 'postCheckout.ticketWillSendToEmail' });

      case 'error':
        return '';
    }
  };

  const renderCartCompletionAction = (orderId: string | undefined) => {
    switch (cartStatus) {
      case 'completed':
        return (
          <Button
            onClick={() => {
              logEvent({
                eventName: 'post_checkout_my_ticket_button_clicked',
                value: orderId ?? '',
                metadata: { cartId, orderId: orderId ?? '' },
              });
              router.replace('/me/my-order');
            }}
            size="lg"
          >
            {intl.formatMessage({ id: 'ticket.myOrders' })}
          </Button>
        );

      case 'error':
        return (
          <Button
            onClick={() => {
              logEvent({
                eventName: 'post_checkout_homepage_button_clicked',
                value: orderId ?? '',
                metadata: { cartId, orderId: orderId ?? '' },
              });
              router.replace('/');
            }}
            className="!bg-neutral-950"
            size="lg"
          >
            {intl.formatMessage({ id: 'common.homepage' })}
          </Button>
        );
    }
  };

  const renderNotification = () => {
    const completeCartData = completeCartRes?.data;
    let quantity = 0;
    if (completeCartData && completeCartData.items) {
      completeCartData.items.map((item) => {
        quantity += item?.quantity || 0;
      });
    }
    const coverPhoto = getCoverPhoto();

    return (
      <div className="flex flex-col items-center justify-center gap-4 ">
        <div className="flex items-center gap-4">
          <p className=" text-sm items-center font-semibold">{renderCartCompletionTitle(quantity)}</p>
        </div>

        <div
          className={classNames('flex flex-col items-center justify-center', {
            'mt-0': cartStatus === 'error',
          })}
        >
          <div className="flex items-center">{renderCartCompletionIcon()}</div>

          <p className="flex flex-col items-center text-sm">
            {renderCartCompletionDescription()}{' '}
            <span className="font-bold text-sm items-center">
              {(completeCartData?.metadata['emailForTicket'] as string) ?? completeCartData?.email}
            </span>
          </p>
        </div>
        <div>{renderCartCompletionAction(completeCartData?.id)}</div>
      </div>
    );
  };

  return (
    <FlipLayout>
      <ContentCenterNarrow>
        <div className="flex flex-col items-center justify-center gap-6">
          <Card className=" mt-9 px-4 py-6 w-full">{isLoading ? renderLoading() : renderNotification()}</Card>
          <EventInfoCard event={event as FlipEvent} />
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
