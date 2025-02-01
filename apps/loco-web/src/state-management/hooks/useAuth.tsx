'use client';

import { Login } from '@/containers/login';
import { SignUp } from '@/containers/sign-up';
import { firebaseAuth } from '@/lib/firebase';
import { User, signOut } from 'firebase/auth';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from '@/components/shadcn/ui/alert-dialog';
import { EmailVerification } from '@/containers/email-verification/EmailVerification';
import { ForgotPassword } from '@/containers/forgot-password';
import useResetAllOrganizerState from '@/state-management/useResetAllOrganizerState';
import { gql, useMutation } from '@apollo/client';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

type AuthContextType = {
  currentUser: User | null;
  isLoggedIn: boolean;
  openLoginModal: (onSuccess?: () => void) => void;
  openSignUpModal: () => void;
  openForgotPasswordModal: () => void;
  openEmailVerificationModal: () => void;
  closeForgotPasswordModal: () => void;
  closeLoginModal: (onDismiss?: () => void) => void;
  closeSignUpModal: () => void;
  closeEmailVerificationModal: () => void;
  onSignOut: () => Promise<void>;
  sendSignUpVerificationEmail: () => Promise<void>;
  recomputeAuthState: () => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoggedIn: false,
  openLoginModal: () => {},
  openSignUpModal: () => {},
  openForgotPasswordModal: () => {},
  openEmailVerificationModal: () => {},
  closeLoginModal: () => {},
  closeSignUpModal: () => {},
  closeForgotPasswordModal: () => {},
  closeEmailVerificationModal: () => {},
  onSignOut: async () => {},
  sendSignUpVerificationEmail: async () => {},
  recomputeAuthState: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

const SEND_SIGN_UP_VERIFICATION_EMAIL = gql(`
  mutation SendSignUpVerificationEmail($data: SendSignUpVerificationEmailInput!) {
    sendSignUpVerificationEmail(data: $data)
  }
`);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] = useState(false);
  const [forceRecomputeAuthState, setForceRecomputeAuthState] = useState(0);

  const isLoggedIn = !!currentUser;
  const resetAllOrgState = useResetAllOrganizerState();

  let [sendSignUpVerificationEmailMutation] = useMutation(SEND_SIGN_UP_VERIFICATION_EMAIL, {
    variables: { data: { email: currentUser?.email ?? '', id: currentUser?.uid ?? '' } },
  });

  useEffect(() => {
    const unsubscribe = firebaseAuth.onIdTokenChanged(async (user) => {
      const needVerifyEmailKey = 'needVerifyEmail';
      if (user?.emailVerified === false) {
        localStorage.setItem(needVerifyEmailKey, 'true');
      }

      const needVerifyEmail = localStorage.getItem(needVerifyEmailKey);
      if (user?.emailVerified && needVerifyEmail) {
        localStorage.removeItem(needVerifyEmailKey);
        // Force refresh token when email is verified for the first time.
        await user.getIdToken(true);
      }

      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const closeSignUpModal = () => setIsSignUpModalOpen(false);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);
  const closeEmailVerificationModal = () => setIsEmailVerificationModalOpen(false);

  const openLoginModal = (onSuccess?: () => void) => {
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsEmailVerificationModalOpen(false);

    setIsLoginModalOpen(true);
  };

  const openSignUpModal = () => {
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsEmailVerificationModalOpen(false);

    setIsSignUpModalOpen(true);
  };

  const openForgotPasswordModal = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsEmailVerificationModalOpen(false);

    setIsForgotPasswordModalOpen(true);
  };

  const openEmailVerificationModal = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);

    setIsEmailVerificationModalOpen(true);
  };

  const recomputeAuthState = useCallback(() => {
    setForceRecomputeAuthState(forceRecomputeAuthState + 1);
  }, [forceRecomputeAuthState]);

  const onSignOut = useCallback(async () => {
    await signOut(firebaseAuth);
    router.push('/');
    resetAllOrgState();
  }, [resetAllOrgState, router]);

  const sendSignUpVerificationEmail = useCallback(async () => {
    await sendSignUpVerificationEmailMutation();
  }, [sendSignUpVerificationEmailMutation]);

  const isAlertDialogOpen =
    isSignUpModalOpen || isLoginModalOpen || isForgotPasswordModalOpen || isEmailVerificationModalOpen;

  const memoedValue = useMemo(
    () => ({
      currentUser,
      isLoggedIn,
      openLoginModal,
      openSignUpModal,
      openForgotPasswordModal,
      openEmailVerificationModal,
      closeLoginModal,
      closeSignUpModal,
      closeForgotPasswordModal,
      closeEmailVerificationModal,
      onSignOut,
      sendSignUpVerificationEmail,
      forceRecomputeAuthState,
      recomputeAuthState,
    }),
    [
      currentUser,
      isLoggedIn,
      closeLoginModal,
      onSignOut,
      sendSignUpVerificationEmail,
      forceRecomputeAuthState,
      recomputeAuthState,
    ]
  );

  function resetAllState() {
    setIsLoading(false);
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsEmailVerificationModalOpen(false);
  }

  return (
    <AuthContext.Provider value={memoedValue}>
      {!isLoading && children}
      <AlertDialog open={isAlertDialogOpen}>
        <AlertDialogContent className="!w-96 p-6 max-h-full overflow-y-auto">
          {/* Empty `AlertDialogTitle` to fix `AlertDialogContent` requires a `AlertDialogTitle` for the component to be accessible for screen reader users. */}
          <AlertDialogTitle />
          <AlertDialogCancel
            className="w-12 h-12 absolute top-4 right-4 rounded-full border-gray-200"
            onClick={resetAllState}
          >
            <XIcon size={24} />
          </AlertDialogCancel>
          {isSignUpModalOpen && <SignUp onOpenLogin={openLoginModal} />}
          {isLoginModalOpen && <Login onOpenSignUp={openSignUpModal} />}
          {isForgotPasswordModalOpen && <ForgotPassword onOpenLogin={openLoginModal} />}
          {isEmailVerificationModalOpen && <EmailVerification />}
        </AlertDialogContent>
      </AlertDialog>
    </AuthContext.Provider>
  );
};
