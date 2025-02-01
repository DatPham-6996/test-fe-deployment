import { validateYupSchema } from '@/lib/utils/format';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { MailIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { ErrorInputWrapper } from '../error-input-wrapper';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { getPasswordlessLoginSchema } from './schema';
import { useSendPasswordlessSignInEmailMutation } from '@/lib/__generated__/graphql';

enum ResendEmailTimeoutLevel {
  SHORT = 15,
  MEDIUM = 30,
  LONG = 60,
}

type PasswordlessLoginFormValues = {
  email: string;
};

export function PasswordlessLoginForm() {
  const intl = useIntl();
  const { formatMessage } = intl;
  const [verificationEmail, setVerificationEmail] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [sendingEmailLink, setSendingEmailLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);
  const { isLoggedIn, closeLoginModal } = useAuth();
  const [sendPasswordlessSignInEmail] = useSendPasswordlessSignInEmailMutation();

  const buildContinueUrl = (email: string) => {
    const encodedEmail = encodeURIComponent(email);
    const continueUrl = new URL(window.location.href);
    continueUrl.searchParams.append('email', encodedEmail);
    return continueUrl.toString();
  };

  const getTimeoutDuration = (attempts: number) => {
    switch (attempts) {
      case 0:
        return ResendEmailTimeoutLevel.SHORT;
      case 1:
        return ResendEmailTimeoutLevel.MEDIUM;
      default:
        return ResendEmailTimeoutLevel.LONG;
    }
  };

  const sendEmailLink = async (email: string) => {
    setSendingEmailLink(true);
    try {
      await sendPasswordlessSignInEmail({
        variables: {
          data: {
            email,
            redirectUrl: buildContinueUrl(email),
          },
        },
      });
      window.localStorage.setItem('emailForSignIn', email);
      setVerificationEmail(email);
      setTimeLeft(getTimeoutDuration(resendAttempts));
      setCanResend(false);
    } catch (e) {
      console.error('Login failed: ', e);
      toastError(formatMessage({ id: 'authentication.loginFailed' }));
    } finally {
      setSendingEmailLink(false);
    }
  };

  const onSubmit = async (values: PasswordlessLoginFormValues) => {
    await sendEmailLink(values.email);
  };

  useEffect(() => {
    if (verificationEmail && isLoggedIn) {
      closeLoginModal();
    }
  }, [isLoggedIn, closeLoginModal, verificationEmail]);

  useEffect(() => {
    if (!verificationEmail) {
      return;
    }

    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    let mounted = true;

    const timer = setInterval(() => {
      if (mounted) {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [timeLeft, verificationEmail]);

  const handleResend = async () => {
    try {
      if (!verificationEmail) {
        throw new Error('No verification email');
      }

      await sendEmailLink(verificationEmail);
      setCanResend(false);
      const newAttempts = resendAttempts + 1;
      setResendAttempts(newAttempts);
      setTimeLeft(getTimeoutDuration(newAttempts));
      toastSuccess(formatMessage({ id: 'authentication.emailResentSuccess' }));
    } catch (e) {
      console.error('Error resending email:', e);
      toastError(formatMessage({ id: 'authentication.loginFailed' }));
    }
  };

  if (verificationEmail) {
    return (
      <>
        <div className="rounded-full bg-secondary h-24 w-24 items-center justify-center flex">
          <MailIcon size={38} className="animate-pulse" />
        </div>
        <p className="my-4 text-left">
          <span>{formatMessage({ id: 'authentication.emailLinkSent' })}</span>
          <span className="font-semibold">{verificationEmail}</span>
        </p>
        <p className="text-left">
          <span>{formatMessage({ id: 'authentication.emailLinkSentDescription' })}</span>
        </p>
        <Button
          variant="default"
          onClick={handleResend}
          disabled={!canResend}
          loading={sendingEmailLink}
          className="w-full mt-2"
        >
          {canResend
            ? formatMessage({ id: 'authentication.resendEmail' })
            : formatMessage({ id: 'authentication.resendEmailTimer' }, { seconds: timeLeft })}
        </Button>
      </>
    );
  }

  return (
    <Form<PasswordlessLoginFormValues>
      onSubmit={onSubmit}
      validate={validateYupSchema(getPasswordlessLoginSchema(intl))}
      render={({ handleSubmit, submitting, submitSucceeded, submitError }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="rounded-full bg-secondary h-20 w-20 items-center justify-center flex">
              <Image src="/icons/flip-grad.png" alt="flip logo" width={24} height={24} />
            </div>
            <p className="text-xl font-medium mt-3">
              {formatMessage({ id: 'authentication.joinFlipPrefix' })}{' '}
              <span className="text-xl font-bold">Flip.vn</span>{' '}
              {/* {formatMessage({ id: 'authentication.joinFlipSuffix' })} */}
            </p>
            <div className="flex flex-col gap-2 mt-3">
              <div className="flex flex-col gap-1 w-full">
                <Field name="email" required>
                  {(field) => (
                    <ErrorInputWrapper field={field}>
                      <Input
                        disabled={submitting}
                        placeholder={formatMessage({ id: 'authentication.emailPlaceholder' })}
                        {...field.input}
                        type="email"
                      />
                    </ErrorInputWrapper>
                  )}
                </Field>
              </div>

              <Button
                loading={submitting || sendingEmailLink}
                error={submitError}
                success={submitSucceeded}
                className="mt-3"
                size={'lg'}
              >
                {formatMessage({ id: 'authentication.loginWithPasswordless' })}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
}
