'use client';

import { authWithFirebase } from '@/lib/api/flip-ticketing/v1/authFirebase';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { applyActionCode, checkActionCode, getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';

export default function AuthActionHandler() {
  const { formatMessage } = useIntl();
  const { currentUser, openLoginModal, onSignOut, isLoggedIn } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { logEvent } = useLogEvent();
  const mode = searchParams.get('mode');
  const actionCode = searchParams.get('oobCode');

  // const handleRecoverEmail = useCallback((actionCode: string) => {
  //   // TODO
  // }, []);

  const handleResetPassword = useCallback(
    (actionCode: string) => {
      router.replace(`/auth/reset-password?actionCode=${actionCode}`);
    },
    [router]
  );

  const handleVerifyAndChangeEmail = useCallback(
    async (actionCode: string) => {
      try {
        await applyActionCode(firebaseAuth, actionCode);
        router.replace('/');
        toastSuccess(formatMessage({ id: 'authentication.emailVerifiedSuccessfully' }), {
          toastId: 'authentication.emailVerifiedSuccessfully',
        });
        openLoginModal();
      } catch (e) {
        toastError(formatMessage({ id: 'me.personalInfo.emailVerifiedFailed' }), {
          toastId: 'me.personalInfo.emailVerifiedFailed',
        });
        router.replace('/me/personal-info');
      }
    },
    [router, formatMessage, openLoginModal]
  );

  const handleVerifyEmail = useCallback(
    async (actionCode: string) => {
      try {
        if (isEmailVerified) {
          return;
        }

        const {
          data: { email },
        } = await checkActionCode(firebaseAuth, actionCode);

        await applyActionCode(firebaseAuth, actionCode);
        await currentUser?.reload();

        if (email !== currentUser?.email) {
          setIsEmailVerified(true);
          toastSuccess(formatMessage({ id: 'authentication.emailVerifiedSuccessfully' }), {
            toastId: 'authentication.emailVerifiedSuccessfully',
          });
          onSignOut();
          return;
        }

        setIsEmailVerified(true);
        router.replace('/me/personal-info?verifyEmail=true');
        toastSuccess(formatMessage({ id: 'authentication.emailVerifiedSuccessfully' }), {
          toastId: 'authentication.emailVerifiedSuccessfully',
        });
      } catch (e) {
        toastError(formatMessage({ id: 'me.personalInfo.emailVerifiedFailed' }), {
          toastId: 'me.personalInfo.emailVerifiedFailed',
        });
        router.replace('/me/personal-info');
      }
    },
    [router, formatMessage, currentUser, onSignOut, isEmailVerified]
  );

  const handleSignInWithEmailLink = useCallback(
    async (actionCode: string) => {
      const auth = getAuth();
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Check if continueUrl is from a different domain, if so, redirect to the correct domain.
        // This is needed because Firebase Auth will set the confirmation link to "https://flip.vn/"
        // But we can also login on "https://staging.flip.vn/" or "http://localhost:3000/" (for development)
        //
        const maybeRedirectToCorrectDomain = (): boolean => {
          const continueUrlString = searchParams.get('continueUrl');
          if (continueUrlString) {
            const continueUrl = new URL(continueUrlString);
            const currentUrl = new URL(window.location.href);

            const currentUrlOrigin = currentUrl.origin;
            const continueUrlOrigin = continueUrl.origin;

            if (currentUrlOrigin !== continueUrlOrigin) {
              // Build new URL with continueUrl domain but keep current path and params
              const newUrl = new URL(currentUrl);
              newUrl.protocol = continueUrl.protocol;
              newUrl.hostname = continueUrl.hostname;
              newUrl.port = continueUrl.port;
              // Redirect to the same path but on the correct domain
              window.location.href = newUrl.toString();
              return true;
            }
          }

          return false;
        };

        const getEmailForValidation = () => {
          let emailFromLocalStorage = window.localStorage.getItem('emailForSignIn');
          if (emailFromLocalStorage) {
            return emailFromLocalStorage;
          }

          const continueUrl = searchParams.get('continueUrl');
          const emailFromUrl = new URL(continueUrl ?? '').searchParams.get('email');
          if (emailFromUrl) {
            const decodedEmailFromUrl = decodeURIComponent(emailFromUrl);
            return decodedEmailFromUrl;
          }

          return null;
        };

        const getContinueUrl = () => {
          const continueUrlString = searchParams.get('continueUrl');

          if (!continueUrlString) {
            throw new Error('Continue URL not found');
          }

          const continueUrl = new URL(continueUrlString ?? '');
          continueUrl.searchParams.delete('email');

          return continueUrl;
        };

        const forwardToContinueUrl = () => {
          const continueUrl = getContinueUrl();
          router.replace(continueUrl.pathname + continueUrl.search);
        };

        const forwardToHome = () => {
          router.replace('/');
        };

        try {
          const redirected = maybeRedirectToCorrectDomain();
          if (redirected) {
            return;
          }

          let email = getEmailForValidation();
          if (!email) {
            throw new Error('Email not found');
          }

          // If user is already logged in, we need to check if the email is the same as the one in the link
          // If not, we need to sign out the user and sign in with the new email
          if (isLoggedIn) {
            await currentUser?.reload();

            if (currentUser?.email === email) {
              toastSuccess(formatMessage({ id: 'authentication.loginSuccessfully' }));
              forwardToContinueUrl();
              return;
            } else if (currentUser?.email !== email) {
              await onSignOut();
            }
          }

          // The client SDK will parse the code from the link for you.
          const userCredential = await signInWithEmailLink(auth, email, window.location.href);
          const accessToken = await userCredential.user.getIdToken();
          await authWithFirebase(accessToken);
          toastSuccess(formatMessage({ id: 'authentication.loginSuccessfully' }));
          window.localStorage.removeItem('emailForSignIn');
          logEvent({
            eventName: 'logged_in',
            value: email,
            metadata: { view: 'web' },
          });
          forwardToContinueUrl();
        } catch (e) {
          console.error('Sign in with email link failed', e);
          window.localStorage.removeItem('emailForSignIn');
          forwardToHome();
          toastError(formatMessage({ id: 'authentication.loginFailed' }));
        }
      }
    },
    [searchParams, router, isLoggedIn, formatMessage, logEvent, currentUser, onSignOut]
  );

  useEffect(() => {
    if (!mode || !actionCode) {
      return router.replace('/not-found');
    }

    switch (mode) {
      case 'verifyEmail':
        handleVerifyEmail(actionCode);
        break;

      case 'verifyAndChangeEmail':
        handleVerifyAndChangeEmail(actionCode);
        break;

      case 'resetPassword':
        handleResetPassword(actionCode);
        break;

      case 'signIn':
        handleSignInWithEmailLink(actionCode);
        break;

      // case 'recoverEmail':
      //   handleRecoverEmail(actionCode);
      //   break;

      default:
        return router.replace('/not-found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ClipLoader className="fixed top-1/2 left-1/2" />;
}
