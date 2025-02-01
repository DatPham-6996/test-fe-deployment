import { generatePaymentQRCode } from '@/lib/api/flip-ticketing/v1/paymentQRCode';
import { SPINNER_DARK_COLOR, SPINNER_LIGHT_COLOR } from '@/lib/utils/constants';
import { formatPrice } from '@/lib/utils/format';
import { toastError, toastSuccess, toastWarn } from '@/lib/utils/toast';
import {
  PAYMENT_NOT_AUTHORIZED_YET_ERROR_MESSAGE,
  RESERVATION_SESSION_ERROR_MESSAGE,
  useCompleteCartWithRetry,
} from '@/state-management/hooks/useCompleteCartWithRetry';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { CopyIcon, Download } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { Card, CardBody } from '../card';
import { Button } from '../shadcn/ui/button';
import { Separator } from '../shadcn/ui/separator';
import { PaymentsProps, VirtualAccountPaymentInfo } from './type';

export const BankTransferForm = ({ onPaymentClick, paymentInfo }: PaymentsProps) => {
  const cartId = (paymentInfo as VirtualAccountPaymentInfo).cartId;
  const { formatMessage } = useIntl();
  const { mutateAsync: completeCart } = useCompleteCartWithRetry(cartId);
  const [submitting, setSubmitting] = useState(false);
  const [qrCodeLoading, setQRCodeLoading] = useState(true);
  const [qrDataURL, setQRDataURL] = useState('');
  const isDarkMode = useIsDarkTheme();

  const formatBankNameForQR = (bankName: string) => {
    switch (bankName.toUpperCase()) {
      case 'WOORI':
        return 'Woori';

      case 'VIETCAPITAL':
        return 'VietCapitalBank';

      case 'PV':
        return 'PVcomBank';

      case 'MSB':
        return 'MSB';

      case 'VPB':
        return 'VPBank';

      default:
        return bankName;
    }
  };

  useEffect(() => {
    const generateQRCode = async () => {
      const { bankName, accountName, accountNumber, amount, cartDisplayId } = paymentInfo as VirtualAccountPaymentInfo;
      try {
        const { qrDataURL } = await generatePaymentQRCode({
          bankName: formatBankNameForQR(bankName),
          accountName,
          accountNumber,
          amount: String(amount),
          description: cartDisplayId,
        });
        setQRDataURL(qrDataURL);
      } catch (e) {
        toastError(formatMessage({ id: 'payment.virtualAccount.qrCodeGenerationError' }));
      } finally {
        setQRCodeLoading(false);
      }
    };

    generateQRCode();
  }, [paymentInfo, formatMessage]);

  const onCopyIconClick = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toastSuccess(formatMessage({ id: 'common.copied' }));
  };

  if (paymentInfo?.paymentMethod !== 'virtual-account') {
    return;
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await completeCart();
      toastSuccess(formatMessage({ id: 'payment.notification.completeTransferSuccessfully' }));
      await onPaymentClick();
    } catch (err: TODO) {
      if (err.message === PAYMENT_NOT_AUTHORIZED_YET_ERROR_MESSAGE) {
        toastWarn(formatMessage({ id: 'payment.virtualAccount.paymentNotAuthorizedYet' }));
        setSubmitting(false);
        return;
      }

      if (err.message === RESERVATION_SESSION_ERROR_MESSAGE) {
        toastError(formatMessage({ id: 'postCheckout.reservationSessionNotFound' }));
        setSubmitting(false);
        return;
      }
    }
  };

  const formatBankNameForDisplay = (bankName: string) => {
    switch (bankName.toUpperCase()) {
      case 'WOORI':
        return 'Woori';

      case 'VIETCAPITAL':
        return 'BVBank';

      case 'PV':
        return 'PVcomBank';

      case 'MSB':
        return 'MSB';

      case 'VPB':
        return 'VPBank';

      default:
        return bankName;
    }
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrDataURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.download = `payment-qr-${paymentInfo.cartDisplayId}.png`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      toastError(formatMessage({ id: 'common.error' }));
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 flex-wrap md:flex-nowrap mb-5">
        <div className="flex justify-center items-center flex-grow min-[635px]:flex-grow-0">
          <div className="flex flex-col items-center gap-2">
            {!qrCodeLoading && (
              <>
                <Image
                  className="border border-solid border-neutral-200 rounded-lg p-1"
                  alt="QR Code"
                  width={218}
                  height={218}
                  src={qrDataURL}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleDownloadQR}
                  disabled={!qrDataURL}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {formatMessage({ id: 'payment.virtualAccount.downloadQR' })}
                </Button>
              </>
            )}
            {qrCodeLoading && (
              <div className="flex items-center justify-center border border-solid border-neutral-200 rounded-lg p-1 w-[218px] h-[218px]">
                <PulseLoader size={10} color={isDarkMode ? SPINNER_LIGHT_COLOR : SPINNER_DARK_COLOR} />
              </div>
            )}
          </div>
        </div>
        <Card className="border border-solid border-neutral-200 pb-3 pt-4 flex-grow dark:bg-secondary dark:border-none">
          <CardBody className="px-3">
            <div className="flex flex-wrap justify-between items-center pb-2">
              <div>{formatMessage({ id: 'payment.virtualAccount.bank' })}</div>
              <div className="flex gap-1 items-center">
                <div>
                  <p className="font-medium">{formatBankNameForDisplay(paymentInfo.bankName)}</p>
                </div>
                <CopyIcon
                  size={16}
                  className="hover:cursor-pointer ml-2 min-w-[16px]"
                  onClick={() => onCopyIconClick(formatBankNameForDisplay(paymentInfo.bankName))}
                />
              </div>
            </div>

            <Separator orientation="horizontal" />
            <div className="flex flex-wrap items-center justify-between py-2">
              <div>{formatMessage({ id: 'payment.virtualAccount.cartId' })}</div>
              <div className="flex gap-1 items-center">
                <p className="font-medium">
                  {'#'}
                  {paymentInfo.cartDisplayId}
                </p>
                <CopyIcon
                  size={16}
                  className="hover:cursor-pointer ml-1"
                  onClick={() => onCopyIconClick(paymentInfo.cartDisplayId)}
                />
              </div>
            </div>

            <Separator orientation="horizontal" />
            <div className="flex justify-between items-center flex-wrap py-2 min-[370px]:flex-nowrap">
              <div className="pr-32 min-[370px]:pr-6">
                {formatMessage({ id: 'payment.virtualAccount.accountNumber' })}
              </div>
              <div className="flex flex-1 gap-1 items-center min-[370px]:justify-end">
                <p className="font-medium text-blue-700">{paymentInfo.accountNumber}</p>
              </div>
              <CopyIcon
                size={16}
                className="hover:cursor-pointer ml-2 min-w-[16px]"
                onClick={() => onCopyIconClick(paymentInfo.accountNumber)}
              />
            </div>

            <Separator orientation="horizontal" />
            <div className="flex justify-between items-center flex-wrap py-2">
              <div>{formatMessage({ id: 'payment.virtualAccount.accountName' })}</div>
              <div className="flex gap-1 items-center ">
                <p className="font-medium">{paymentInfo.accountName}</p>
                <CopyIcon
                  size={16}
                  className="hover:cursor-pointer ml-1"
                  onClick={() => onCopyIconClick(paymentInfo.accountName)}
                />
              </div>
            </div>

            <Separator orientation="horizontal" />
            <div className="flex justify-between items-center flex-wrap pt-2">
              <div>{formatMessage({ id: 'payment.virtualAccount.amount' })}</div>
              <div className="flex gap-1 items-center ">
                <p className="font-medium text-blue-700">{formatPrice(paymentInfo.amount)}</p>
                <CopyIcon
                  size={16}
                  className="hover:cursor-pointer ml-1"
                  onClick={() => onCopyIconClick(paymentInfo.amount)}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-2">
        <p className="font-medium">{formatMessage({ id: 'common.notice' })}:</p>
        <ul className="list-disc px-5 mt-3 text-sm">
          <li>{formatMessage({ id: 'payment.virtualAccount.transferExact' })}</li>
          <li>{formatMessage({ id: 'payment.virtualAccount.notSaveAccountNumber' })}</li>
        </ul>
      </div>

      <div className="mt-4">
        <Button className="w-full" onClick={handleSubmit} loading={submitting}>
          {formatMessage({ id: 'payment.virtualAccount.completeTransfer' })}
        </Button>
      </div>
    </div>
  );
};
