import { ConfirmationDialog } from '@/components/responsive-dialog/confirmation-dialog';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { usePaymentModal } from '@/state-management/hooks/usePaymentModal';
import { useGateValue } from '@statsig/react-bindings';
import { useIntl } from 'react-intl';

export const PaymentButton = ({
  loading,
  disabled = false,
  isDemoEvent = false,
  onDone,
}: {
  loading: boolean;
  disabled: boolean;
  isDemoEvent: boolean;
  onDone?: () => void;
}) => {
  const intl = useIntl();
  const { openPaymentModal } = usePaymentModal();
  const isFlipTest = useGateValue('flip_prod_test');
  const { openDialog } = useResponsiveDialog();

  return (
    <Button
      onClick={() => {
        if (!isDemoEvent || isFlipTest) {
          openPaymentModal();
        } else {
          openDialog(
            <ConfirmationDialog
              action={() => { }}
              content={intl.formatMessage({ id: 'checkout.validation.notOnSale' })}
            />
          );
        }
        if (onDone) onDone();
      }}
      loading={loading}
      disabled={disabled}
      size="lg"
    >
      {intl.formatMessage({ id: 'payment.submitPayment' })}
    </Button>
  );
};
