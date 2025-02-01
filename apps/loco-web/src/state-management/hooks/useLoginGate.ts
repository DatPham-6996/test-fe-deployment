import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useIntl } from 'react-intl';
import { useAuth } from './useAuth';

export function useLoginGate() {
  const { isLoggedIn, openLoginModal, currentUser, openEmailVerificationModal, sendSignUpVerificationEmail } =
    useAuth();
  const { formatMessage } = useIntl();

  const checkLogin = async (setLoading?: (loading: boolean) => void) => {
    if (!isLoggedIn) {
      openLoginModal();
      setLoading?.(false);
      return false;
    }

    if (!currentUser?.emailVerified) {
      openEmailVerificationModal();

      try {
        await sendSignUpVerificationEmail();
        toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
      } catch (error) {
        toastError(formatMessage({ id: 'authentication.sendEmailVerifyFailed' }));
      }

      setLoading?.(false);
      return false;
    }

    return true;
  };

  return { checkLogin };
}
