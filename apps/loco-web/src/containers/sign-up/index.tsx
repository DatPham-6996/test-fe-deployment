import { EmailSignUpForm, SignUpFormValues } from '@/components/authentication/email-sign-up-form';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Separator } from '@/components/shadcn/ui/separator';
import { authWithFirebase } from '@/lib/api/flip-ticketing/v1/authFirebase';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { isInAppBrowser } from '@/lib/utils/client-utils';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { LogInIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import AppleSignInButton from '../login/components/apple-sign-in-button';
import GoogleSignInButton from '../login/components/google-sign-in-button';

type SignUpProps = {
  onOpenLogin: () => void;
};

export const SignUp = ({ onOpenLogin }: SignUpProps) => {
  const { openEmailVerificationModal, closeSignUpModal, sendSignUpVerificationEmail, recomputeAuthState } = useAuth();
  const { formatMessage } = useIntl();
  const { logEvent } = useLogEvent();
  const { openDialog } = useResponsiveDialog();

  const onSignUpEmail = async (values: SignUpFormValues) => {
    try {
      logEvent({
        eventName: 'sign_up',
        value: values.email,
        metadata: { view: 'web' },
      });
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, values.email, values.password);
      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      // This is necessary to update the user's display name
      // Currently, we use useMemo() to prevent rerendering.
      recomputeAuthState();

      const accessToken = await userCredential.user.getIdToken();
      await authWithFirebase(accessToken);

      openEmailVerificationModal();
      await sendSignUpVerificationEmail();

      toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
    } catch (err: any) {
      let errorMessage = formatMessage({ id: 'authentication.error' });

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = formatMessage({ id: 'authentication.validation.emailAlreadyInUse' });
            break;
          default:
            console.error('Sign up failed: ', err);
            break;
        }
      }

      toastError(errorMessage);
    } finally {
      closeSignUpModal();
    }
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className="rounded-full bg-secondary w-fit p-4">
        <LogInIcon size={20} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-semibold">{formatMessage({ id: 'authentication.signUp' })}</p>
        <p className="text-sm">
          {formatMessage({ id: 'authentication.hadAccount' })}{' '}
          <a onClick={onOpenLogin} className="cursor-pointer">
            <span className="text-base font-semibold dark:text-yellow-400 text-blue-500">
              {formatMessage({ id: 'authentication.login' })}
            </span>
          </a>
        </p>
      </div>

      {!isInAppBrowser() && (
        <div className="flex flex-col gap-3">
          <GoogleSignInButton />
          <AppleSignInButton />
        </div>
      )}

      <Separator />
      <EmailSignUpForm onSubmit={onSignUpEmail} />
    </div>
  );
};
