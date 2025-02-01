import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { authWithFirebase } from '@/lib/api/flip-ticketing/v1/authFirebase';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { useAuth } from '@/state-management/hooks/useAuth';
import { OAuthProvider, signInWithPopup } from 'firebase/auth';
import { TiVendorApple } from 'react-icons/ti';
import { useIntl } from 'react-intl';

export default function AppleSignInButton() {
  const { formatMessage } = useIntl();
  const { closeLoginModal, closeSignUpModal, recomputeAuthState } = useAuth();
  const { logEvent } = useLogEvent();
  const { openDialog } = useResponsiveDialog();
  const { locale } = useLocale();

  const onAppleSignInClick = async () => {
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      provider.setCustomParameters({
        locale: locale,
      });

      signInWithPopup(firebaseAuth, provider)
        .then(async (result) => {
          // This is necessary to update the user's display name
          recomputeAuthState();

          const userCredential = OAuthProvider.credentialFromResult(result);
          const fireBaseUser = result.user;

          if (userCredential) {
            const accessToken = await fireBaseUser.getIdToken();

            if (accessToken) {
              await authWithFirebase(accessToken);
            }
          }

          closeLoginModal();
          closeSignUpModal();

          toastSuccess(formatMessage({ id: 'authentication.loginSuccessfully' }));
          logEvent({
            eventName: 'logged_in',
            value: fireBaseUser?.email || '',
            metadata: { view: 'web' },
          });
        })
        .catch((error) => {
          console.error('Login failed: ', error);
        });
    } catch (error) {
      console.error('Login failed: ', error);
      toastError(formatMessage({ id: 'authentication.loginFailed' }));
    }
  };

  return (
    <Button onClick={onAppleSignInClick} variant="secondary">
      <div className="flex gap-2 items-center">
        <TiVendorApple size={22} />
        {formatMessage({ id: 'authentication.loginWithApple' })}
      </div>
    </Button>
  );
}
