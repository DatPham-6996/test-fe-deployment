'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { useDeleteMyAccountMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { EmailAuthProvider, User, reauthenticateWithCredential } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';
import { RedTrash } from '../icon/RedTrash';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { Input } from '../shadcn/ui/input';

const DELETE_MY_ACCOUNT = gql`
  mutation DeleteMyAccount($input: DeleteMyAccountInput!) {
    deleteMyAccount(input: $input)
  }
`;

export const DeleteAccountForm = ({ firebaseUser }: { firebaseUser: User | null }) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const { onSignOut } = useAuth();
  const [deleteMyAccount] = useDeleteMyAccountMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const formSchema = yup.object({
    password: yup.string().required(formatMessage({ id: 'authentication.validation.passwordRequired' })),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (values: { password: string }) => {
    const { password } = values;
    try {
      if (!firebaseUser?.email) {
        toastError(formatMessage({ id: 'me.personalInfo.deleteMyAccountFailed' }));
        return;
      }

      const authCredential = EmailAuthProvider.credential(firebaseUser.email, password);
      const userCredential = await reauthenticateWithCredential(firebaseUser, authCredential);
      const accessToken = await userCredential.user.getIdToken();

      await deleteMyAccount({ variables: { input: { accessToken } } });

      closeDialog();
      toastSuccess(formatMessage({ id: 'me.personalInfo.deleteMyAccountSuccessfully' }), {
        toastId: 'me.personalInfo.deleteMyAccountSuccessfully',
      });

      onSignOut();
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.deleteMyAccountFailed' }));
    }
  };

  return (
    <>
      <RedTrash size={50} />
      <div className="flex-col">
        <h1 className="text-foreground text-2xl font-semibold mt-2 mb-3">
          {formatMessage({ id: 'me.personalInfo.deleteMyAccount' })}
        </h1>
        <span className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.deleteMyAccountDes' })}
          <span className="font-semibold">{` ${firebaseUser?.email} (${firebaseUser?.displayName})`}</span>
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.password' })}
                </FormLabel>
                <FormControl className="w-full">
                  <div className="relative">
                    <Input
                      placeholder={formatMessage({ id: 'me.personalInfo.enterCurrentPassword' })}
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      className="pr-10"
                    />
                    {!showPassword && (
                      <EyeOff
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        size={15}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                    {showPassword && (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        size={15}
                        onClick={() => setShowPassword(false)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-3">{formatMessage({ id: 'me.personalInfo.deleteMyAccountNotice' })}</div>
          <div className="flex">
            <Button className="w-full mr-1" loading={form.formState.isSubmitting} type="submit">
              {formatMessage({ id: 'payment.card.delete' })}
            </Button>
            <Button
              className="w-full ml-1"
              onClick={closeDialog}
              variant="outline"
              disabled={form.formState.isSubmitting}
              type="button"
            >
              {formatMessage({ id: 'payment.card.cancel' })}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
