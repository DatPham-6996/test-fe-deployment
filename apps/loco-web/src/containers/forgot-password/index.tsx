import { ForgotPasswordForm, ForgotPasswordFormValues } from '@/components/authentication/forgot-password-form';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useIntl } from 'react-intl';
type ForgotPasswordProps = {
  onOpenLogin: () => void;
};

export const ForgotPassword = ({ onOpenLogin }: ForgotPasswordProps) => {
  const { closeForgotPasswordModal } = useAuth();
  const { formatMessage } = useIntl();
  const { logEvent } = useLogEvent();

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      logEvent({
        eventName: 'forgot_password',
        value: values.email,
        metadata: { view: 'web' },
      });
      await sendPasswordResetEmail(firebaseAuth, values.email);
      closeForgotPasswordModal();
      toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
    } catch (err: any) {
      let errorMessage = formatMessage({ id: 'authentication.error' });

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/user-not-found':
            errorMessage = formatMessage({ id: 'authentication.validation.userNotFound' });
            break;
          case 'auth/invalid-email':
            errorMessage = formatMessage({ id: 'authentication.validation.emailInvalid' });
            break;
        }
      }

      toastError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">{formatMessage({ id: 'authentication.forgotPassword' })}</p>
      </div>

      <ForgotPasswordForm onSubmit={onSubmit} />
    </div>
  );
};
