import { useSendVerifyAndChangeEmailEmailMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { User } from 'firebase/auth';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { CoolDownButton } from '../shadcn/ui/cool-down-button';

export type ChangeEmailVerificationFormProps = {
  email: string;
  newEmail: string;
  accessToken: string;
  firebaseUser: User;
};

export const ChangeEmailVerificationForm = ({
  email,
  newEmail,
  accessToken,
  firebaseUser,
}: ChangeEmailVerificationFormProps) => {
  const [sendVerifyAndChangeEmailEmail, { data, error }] = useSendVerifyAndChangeEmailEmailMutation();
  const { closeDialog } = useResponsiveDialog();
  const [submitting, setSubmitting] = useState(false);

  const intl = useIntl();
  const { formatMessage } = intl;

  useEffect(() => {
    const timerInterval = setInterval(async () => {
      await firebaseUser?.reload().catch((e) => {
        closeDialog();
        clearInterval(timerInterval);
      });
    }, 2000); // 2 seconds

    return () => clearInterval(timerInterval);
  }, [firebaseUser, closeDialog]);

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      await sendVerifyAndChangeEmailEmail({ variables: { input: { email, newEmail, accessToken } } });
      toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
      setSubmitting(false);
    } catch (error) {
      toastError(formatMessage({ id: 'authentication.sendEmailVerifyFailed' }));
    }
  };

  return (
    <>
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
      <div className="flex flex-col pb-2">
        <p className="text-3xl font-medium">
          {formatMessage({ id: 'authentication.emailVerification' })}
        </p>
        <p className="mb-2">
          {formatMessage({ id: 'me.personalInfo.reLoginAfterVerifying' })}{' '}
          {formatMessage({ id: 'authentication.emailVerificationSent' })}{' '}
          <p className="font-semibold">{newEmail}</p>
          <p></p>
        </p>
        <p className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'authentication.spamCheckVerificationEmail' })}
        </p>
      </div>

      <CoolDownButton onClick={onSubmit} className="w-full" loading={submitting} startWithCoolDown={true}>
        {formatMessage({ id: 'authentication.resendVerificationEmail' })}
      </CoolDownButton>
    </>
  );
};
