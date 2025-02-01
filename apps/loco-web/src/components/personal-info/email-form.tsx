'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { useSendVerifyAndChangeEmailEmailMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { gql } from '@apollo/client';
import { EmailAuthProvider, User, reauthenticateWithCredential } from 'firebase/auth';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { ChangeEmailVerificationForm } from './change-email-verification-form';

const SEND_VERIFICATION_AND_CHANGE_EMAIL_EMAIL = gql(`
  mutation SendVerifyAndChangeEmailEmail($input: SendVerifyAndChangeEmailEmailInput!) {
    sendVerifyAndChangeEmailEmail(input: $input)
  }
`);

export const EmailForm = ({ email, firebaseUser }: { email: string; firebaseUser: User | null }) => {
  const { formatMessage } = useIntl();
  const { openDialog } = useResponsiveDialog();

  const [sendVerifyAndChangeEmailEmail, { data, error }] = useSendVerifyAndChangeEmailEmailMutation();

  const formSchema = yup.object({
    newEmail: yup.string().required(),
    currentPassword: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      newEmail: email,
    },
  });

  const onSubmit = async (values: { newEmail: string; currentPassword: string }) => {
    const { newEmail, currentPassword } = values;
    try {
      if (firebaseUser) {
        const authCredential = EmailAuthProvider.credential(email, currentPassword);
        const userCredential = await reauthenticateWithCredential(firebaseUser, authCredential);

        const accessToken = await userCredential.user.getIdToken();

        await sendVerifyAndChangeEmailEmail({
          variables: {
            input: { accessToken, email, newEmail },
          },
        });

        openDialog(
          <ChangeEmailVerificationForm
            accessToken={accessToken}
            email={email}
            newEmail={newEmail}
            firebaseUser={firebaseUser}
          />
        );
        toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }), {
          toastId: 'authentication.sendEmailVerifySuccessfully',
        });
      }
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), { toastId: 'me.personalInfo.updateFailed' });
    }
  };

  if (error) {
    toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
      toastId: 'me.personalInfo.updateFailed',
    });
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.changeEmailTitle' })}</h1>
        <p className="text-muted-foreground text-sm font-normal">
          {formatMessage({ id: 'me.personalInfo.changeEmailDescription' })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="currentPassword" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.currentPassword' })}
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder={formatMessage({ id: 'me.personalInfo.enterCurrentPassword' })}
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newEmail" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.newEmail' })}
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder={formatMessage({ id: 'me.personalInfo.enterEmail' })} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" loading={form.formState.isSubmitting}>
            {formatMessage({ id: 'me.personalInfo.update' })}
          </Button>
        </form>
      </Form>
    </>
  );
};
