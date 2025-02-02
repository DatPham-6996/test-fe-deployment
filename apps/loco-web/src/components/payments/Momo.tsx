import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { MomoPaymentInfo, PaymentsProps } from './type';

import { Momo as MomoIcon } from '@/components/icon';
import { CART_PAYMENT_SUCCEEDED_PREFIX } from '@/lib/utils/constants';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useCompleteCartWithRetry } from '@/state-management/hooks/useCompleteCartWithRetry';
import { Button } from '../shadcn/ui/button';

export const Momo = ({ onPaymentClick, paymentInfo }: PaymentsProps) => {
  const { cartId, paymentUrl } = paymentInfo as MomoPaymentInfo;
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync: completeCart } = useCompleteCartWithRetry(cartId);
  const { formatMessage } = useIntl();

  const listenToVerificationEvent = (params: { windowReference: Window }) => {
    const { windowReference } = params;
    const intervalId = setInterval(() => {
      const paymentVerificationKey = `${CART_PAYMENT_SUCCEEDED_PREFIX}${cartId}`;
      const isPaymentSucceeded = localStorage.getItem(paymentVerificationKey) === 'true';
      if (isPaymentSucceeded) {
        windowReference.close();
      }

      if (windowReference.closed) {
        localStorage.removeItem(paymentVerificationKey);
        clearInterval(intervalId);
      }
    }, 500);
  };

  const waitUntilPopupWindowClosed = (popupWindow: Window) => {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (popupWindow?.closed) {
          clearInterval(intervalId);
          resolve(void 0);
        }
      }, 500);
    });
  };

  const onSubmit = async () => {
    let windowReference;
    try {
      setSubmitting(true);
      windowReference = openMomoPaymentWindow({ paymentUrl });
      listenToVerificationEvent({ windowReference });
      await waitUntilPopupWindowClosed(windowReference);

      const isPaymentSucceeded = sessionStorage.getItem(`${CART_PAYMENT_SUCCEEDED_PREFIX}${cartId}`) === 'true';
      if (isPaymentSucceeded) {
        return;
      }

      const completeCartRes = await completeCart();
      if (completeCartRes.type !== 'order') {
        throw new Error('Attempt to complete the cart failed');
      }

      toastSuccess(formatMessage({ id: 'payment.notification.completeTransferSuccessfully' }), {
        toastId: 'completeTransferSuccessfully',
      });

      await onPaymentClick();
    } catch (error) {
      toastError(formatMessage({ id: 'payment.notification.paymentError' }));
      setSubmitting(false);
      windowReference?.close();
    }
  };

  const openMomoPaymentWindow = (params?: { width?: number; height?: number; paymentUrl: string }) => {
    const { width = 860, height = 680 } = params ?? {};

    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const options = `width=${width},height=${height},top=${top},left=${left}`;

    const windowReference = window.open(paymentUrl, 'popup', options);

    if (!windowReference) {
      throw new Error("Can't open momo payment popup window");
    }

    return windowReference;
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <p className="text-sm items-center">
        <FormattedMessage
          id="payment.momo.guidance"
          values={{
            b: (chunks) => <span className="font-bold">{chunks}</span>,
          }}
        />
      </p>

      <Button className="p-5" loading={submitting} onClick={onSubmit}>
        <FormattedMessage id="payment.payBy" />
        <MomoIcon className="ml-2" />
      </Button>
    </div>
  );
};
