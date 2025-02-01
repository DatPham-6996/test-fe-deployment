import { EmailVerificationForm } from '@/components/authentication/email-verification-form';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import Image from 'next/image';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

export const EmailVerification = () => {
  const { currentUser, sendSignUpVerificationEmail, closeEmailVerificationModal } = useAuth();
  const { formatMessage } = useIntl();
  const { logEvent } = useLogEvent();

  useEffect(() => {
    const timerInterval = setInterval(async () => {
      await currentUser?.reload();

      if (!currentUser?.emailVerified) {
        return;
      }

      currentUser.getIdToken(true);

      closeEmailVerificationModal();
      toastSuccess(formatMessage({ id: 'authentication.emailVerifiedSuccessfully' }));
    }, 2000); // 2 seconds

    return () => clearInterval(timerInterval);
  }, [closeEmailVerificationModal, currentUser, formatMessage]);

  const onSubmit = async () => {
    if (!currentUser?.email) {
      console.error('User email is not found for EmailVerification page');
      return;
    }
    try {
      logEvent({
        eventName: 'resend_sign_up_verification_email',
        value: currentUser?.email,
        metadata: { view: 'web' },
      });
      await sendSignUpVerificationEmail();
      toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
    } catch (err) {
      let errorMessage = formatMessage({ id: 'authentication.error' });

      toastError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="w-12 h-12 p-3 bg-purple-100 rounded-[28px] border-8 border-purple-50 justify-center items-center inline-flex">
          <Image
            width={24}
            height={24}
            className="max-w-none w-[24px] h-[24px]"
            alt="mail-icon"
            src="/icons/mail.svg"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-medium text-[31px]">{formatMessage({ id: 'authentication.emailVerification' })}</p>
        <p>
          {formatMessage({ id: 'authentication.emailVerificationSent' })}{' '}
          <p className="font-semibold">{currentUser?.email}</p>
        </p>
        <p className="text-muted-foreground">{formatMessage({ id: 'authentication.spamCheckVerificationEmail' })}</p>
      </div>
      <EmailVerificationForm onSubmit={onSubmit} />
    </div>
  );
};
