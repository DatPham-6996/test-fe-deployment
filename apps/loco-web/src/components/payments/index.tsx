import { Close, Momo as MomoIcon } from '@/components/icon';
import { toastError } from '@/lib/utils/toast';
import { CreditCardIcon, LandmarkIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { IntlShape, useIntl } from 'react-intl';
import { usePaymentModal } from '../../state-management/hooks/usePaymentModal';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../shadcn/ui/alert-dialog';
import { Button } from '../shadcn/ui/button';
import { Separator } from '../shadcn/ui/separator';
import { BankTransferForm } from './BankTransferForm';
import { CreditCardForm } from './CreditCardForm';
import { Momo } from './Momo';
import { PaymentItem } from './PaymentItem';
import { PaymentInfo, PaymentMethod } from './type';

type PaymentMethodItem = {
  value: PaymentMethod;
  text: string;
};

const CLOSE_ICON_SIZE = 24;

const getPaymentMethods = (intl: IntlShape): PaymentMethodItem[] => {
  const { formatMessage } = intl;

  return [
    {
      value: 'virtual-account',
      text: formatMessage({ id: 'payment.payByBankTransferTitle' }),
    },
    {
      value: 'momo',
      text: formatMessage({ id: 'payment.payByMomoTitle' }),
    },
    {
      value: 'card',
      text: formatMessage({ id: 'payment.payByCreditOrVisaCardTitle' }),
    },
    {
      value: 'manual',
      text: 'Manual (Testing)',
    },
  ];
};

const getIcon = (value: PaymentMethod) => {
  switch (value) {
    case 'manual':
    case 'card':
      return <CreditCardIcon size={22} />;

    case 'virtual-account':
      return <LandmarkIcon size={22} />;

    case 'momo':
      return <MomoIcon />;
  }
};

const getHeadingText = (value: PaymentMethod, intl: IntlShape) => {
  const { formatMessage } = intl;
  switch (value) {
    case 'card':
      return formatMessage({ id: 'payment.payByCreditOrVisaCard' });

    case 'virtual-account':
      return formatMessage({ id: 'payment.payByBankTransfer' });

    case 'momo':
      return formatMessage({ id: 'payment.payByMomo' });
  }
};

type PaymentsProps = {
  excludePaymentMethods?: PaymentMethod[];
  onPaymentClick: (payment: PaymentInfo) => void;
  onSelectPaymentMethod: (paymentMethod: PaymentMethod) => Promise<PaymentInfo | undefined>;
  setModelPaymentLoading: (loading: boolean) => void;
  forceClosePaymentModal?: boolean;
};

export const Payments = ({
  onPaymentClick,
  excludePaymentMethods,
  onSelectPaymentMethod,
  setModelPaymentLoading,
  forceClosePaymentModal,
}: PaymentsProps) => {
  const intl = useIntl();
  const { open, closePaymentModal } = usePaymentModal();
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethod>('virtual-account');
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const onOpenPaymentModal = async () => {
      if (!open) {
        return;
      }

      try {
        setLoading(true);
        setModelPaymentLoading(true);
        const payment = await onSelectPaymentMethod(currentPaymentMethod);
        setPaymentInfo(payment);
        setLoading(false);
        setModelPaymentLoading(false);

        if (!payment) {
          closePaymentModal();
        }
      } catch (error) {
        toastError(intl.formatMessage({ id: 'payment.notification.paymentMethodNotAvailable' }));
        setLoading(false);
        setModelPaymentLoading(false);
        closePaymentModal();
      }
    };

    onOpenPaymentModal();
  }, [open, currentPaymentMethod, onSelectPaymentMethod, setModelPaymentLoading, intl, closePaymentModal]);

  const onClick = async (value: PaymentMethod) => {
    setCurrentPaymentMethod(value);
  };

  const handlePaymentClick = async () => {
    if (paymentInfo) {
      onPaymentClick(paymentInfo);
    }
  };

  const paymentMethods = getPaymentMethods(intl).filter(({ value }) => !excludePaymentMethods?.includes(value));

  const icon = getIcon(currentPaymentMethod);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-auto">
        {paymentMethods.map(({ value, text }) => (
          <PaymentItem
            isSelected={currentPaymentMethod === value}
            key={value}
            onClick={onClick}
            value={value}
            icon={getIcon(value)}
            text={text}
          />
        ))}
      </div>

      {loading && <></>}

      <AlertDialog open={open && !loading && !forceClosePaymentModal && !!paymentInfo}>
        <AlertDialogContent
          className={`!p-0 ${currentPaymentMethod === 'virtual-account' ? 'max-w-[650px]' : 'max-w-[600px]'} ${isMobile ? 'overflow-y-scroll' : ''} max-h-[90vh]`}
        >
          {/* Empty `AlertDialogTitle` to fix `AlertDialogContent` requires a `AlertDialogTitle` for the component to be accessible for screen reader users. */}
          <AlertDialogTitle />
          <div className="flex justify-between items-center px-6 pt-4">
            <div className="flex gap-2">
              <div>{icon}</div>
              <div>
                <p className="font-medium">{getHeadingText(currentPaymentMethod, intl)}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={closePaymentModal} size={isMobile ? 'icon' : 'default'}>
              <p className="text-sm font-medium text-blue-700 hidden sm:block">
                {intl.formatMessage({ id: 'payment.changePaymentMethod' })}
              </p>
              <Close width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} className="text-blue-700 block sm:hidden" />
            </Button>
          </div>

          <Separator orientation="horizontal" />

          <div className="flex px-4 py-5">
            {currentPaymentMethod === 'card' && (
              <CreditCardForm paymentInfo={paymentInfo} onPaymentClick={handlePaymentClick} />
            )}
            {currentPaymentMethod === 'virtual-account' && (
              <BankTransferForm paymentInfo={paymentInfo} onPaymentClick={handlePaymentClick} />
            )}
            {currentPaymentMethod === 'momo' && <Momo onPaymentClick={handlePaymentClick} paymentInfo={paymentInfo} />}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
