import { InBrowserWarning } from '@/components/call-out/InBrowserWarning';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { authWithFirebase } from '@/lib/api/flip-ticketing/v1/authFirebase';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { isInAppBrowser } from '@/lib/utils/client-utils';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useIntl } from 'react-intl';

export default function GoogleSignInButton() {
  const { formatMessage } = useIntl();
  const { closeLoginModal, closeSignUpModal, recomputeAuthState } = useAuth();
  const { logEvent } = useLogEvent();
  const { openDialog } = useResponsiveDialog();

  const onGoogleSignInClick = async () => {
    try {
      const provider = new GoogleAuthProvider();

      if (isInAppBrowser()) {
        openDialog(
          <InBrowserWarning
            title={formatMessage({ id: 'operation.googleInAppBrowser1' })}
            message={formatMessage({ id: 'operation.googleInAppBrowser2' })}
          />
        );
        return;
      }

      const userCredential = await signInWithPopup(firebaseAuth, provider);

      // This is necessary to update the user's display name
      recomputeAuthState();

      if (userCredential) {
        const accessToken = await userCredential.user.getIdToken();
        if (accessToken) {
          await authWithFirebase(accessToken);
        }
      }

      const fireBaseUser = userCredential.user;
      closeLoginModal();
      closeSignUpModal();

      toastSuccess(formatMessage({ id: 'authentication.loginSuccessfully' }));
      logEvent({
        eventName: 'logged_in',
        value: fireBaseUser?.email || '',
        metadata: { view: 'web' },
      });
    } catch (error) {
      console.error('Login failed: ', error);
      toastError(formatMessage({ id: 'authentication.loginFailed' }));
    }
  };

  return (
    <Button onClick={onGoogleSignInClick} variant="secondary">
      <div className="flex gap-2 items-center">
        <FcGoogle size={20} />
        {formatMessage({ id: 'authentication.loginWithGoogle' })}
      </div>
    </Button>
  );
}
