'use client';

import { EmailVerificationForm } from '@/components/authentication/email-verification-form';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next-nprogress-bar';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

export default function EmailVerification() {
  const router = useRouter();
  const { currentUser, sendSignUpVerificationEmail } = useAuth();
  const { setTheme } = useTheme();
  const { formatMessage } = useIntl();
  const { logEvent } = useLogEvent();

  useEffect(() => {
    setTheme('light');
  }, [setTheme]);

  useEffect(() => {
    const timerInterval = setInterval(async () => {
      await currentUser?.reload();

      if (!currentUser?.emailVerified) {
        return;
      }

      await currentUser.getIdToken(true);

      toastSuccess(formatMessage({ id: 'authentication.emailVerifiedSuccessfully' }));
      router.push(`/mweb/email-verification?state=success`);
      clearInterval(timerInterval);
    }, 2000); // 2 seconds

    return () => clearInterval(timerInterval);
  }, [currentUser, formatMessage, router]);

  const onSubmit = async () => {
    if (!currentUser?.email) {
      console.error('User email is not found for EmailVerification page');
      return;
    }
    try {
      logEvent({
        eventName: 'resend_sign_up_verification_email',
        value: currentUser?.email,
        metadata: { view: 'mweb' },
      });
      await sendSignUpVerificationEmail();
      toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
    } catch (err: any) {
      let errorMessage = formatMessage({ id: 'authentication.error' });

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = formatMessage({ id: 'authentication.validation.emailAlreadyInUse' });
            break;
        }
      }

      toastError(errorMessage);
    }
  };

  return (
    <div
      className="flex flex-col p-4 h-screen !bg-white"
      style={{
        background: 'linear-gradient(45deg, rgba(253, 224, 71, 0.7) 0%, rgba(255, 255, 255, 0) 40%)',
      }}
    >
      <div className="flex flex-col gap-5 flex-grow justify-center items-center">
        <div className="w-[68px] h-[68px] p-[17px] bg-purple-100 rounded-[39.67px] border-8 border-purple-50 justify-center items-center inline-flex">
          <Image
            width={34}
            height={34}
            className="max-w-none w-[34px] h-[34px]"
            alt="mail-icon"
            src="/icons/mail.svg"
          />
        </div>
        <p className="text-3xl font-medium text-[31px] text-center">
          {formatMessage({ id: 'authentication.emailVerification' })}
        </p>
        <p className="text-center">
          {formatMessage({ id: 'authentication.emailVerificationSent' })}{' '}
          <p className="font-semibold text-center">{currentUser?.email}</p>
        </p>
        <p className="text-muted-foreground text-center px-4">
          {formatMessage({ id: 'authentication.spamCheckVerificationEmail' })}
        </p>
      </div>
      <EmailVerificationForm onSubmit={onSubmit} />
    </div>
  );
}
