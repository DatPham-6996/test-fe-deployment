'use client';

import { EmailSignUpForm, SignUpFormValues } from '@/components/authentication/email-sign-up-form';
import { Flip } from '@/components/icon';
import { authWithFirebase } from '@/lib/api/flip-ticketing/v1/authFirebase';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next-nprogress-bar';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

export default function SignUp() {
  const router = useRouter();
  const { sendSignUpVerificationEmail, recomputeAuthState } = useAuth();
  const { setTheme } = useTheme();
  const { formatMessage } = useIntl();
  const { logEvent } = useLogEvent();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  const navigateToEmailVerification = () => {
    router.push('/mweb/email-verification');
  };

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      logEvent({
        eventName: 'sign_up',
        value: values.email,
        metadata: { view: 'mweb' },
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

      navigateToEmailVerification();
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
    }
  };

  return (
    <div
      className="flex flex-col h-screen p-4 !bg-white"
      style={{
        background: 'linear-gradient(45deg, rgba(253, 224, 71, 0.7) 0%, rgba(255, 255, 255, 0) 40%)',
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center gap-2">
          <Flip />
        </div>
        <div className="flex justify-center">
          <p className="text-3xl font-medium">{formatMessage({ id: 'authentication.signUp' })}</p>
        </div>
        <EmailSignUpForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
