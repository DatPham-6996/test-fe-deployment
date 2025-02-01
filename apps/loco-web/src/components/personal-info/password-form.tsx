'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { EmailAuthProvider, User, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';

export const PasswordForm = ({ firebaseUser }: { firebaseUser: User | null }) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const PASSWORD_MIN_LENGTH = 8;
  const formSchema = yup.object({
    currentPassword: yup.string().required(formatMessage({ id: 'authentication.validation.passwordRequired' })),
    newPassword: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.passwordRequired' }))
      .min(
        PASSWORD_MIN_LENGTH,
        formatMessage({ id: 'authentication.validation.minLengthPassword' }, { length: PASSWORD_MIN_LENGTH })
      )
      .matches(/[^A-Za-z0-9]/, formatMessage({ id: 'authentication.validation.passwordInvalid' })),
    confirmNewPassword: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.repasswordRequired' }))
      .oneOf([yup.ref('newPassword')], formatMessage({ id: 'authentication.validation.passwordNotMatch' })),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (values: { currentPassword: string; newPassword: string; confirmNewPassword: string }) => {
    const { currentPassword, newPassword, confirmNewPassword } = values;

    if (newPassword !== confirmNewPassword) {
      toastError(formatMessage({ id: 'authentication.validation.passwordNotMatch' }));
      return;
    }

    if (!firebaseUser) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    try {
      const authCredential = EmailAuthProvider.credential(firebaseUser.email!, currentPassword);
      const userCredential = await reauthenticateWithCredential(firebaseUser, authCredential);

      await updatePassword(userCredential.user, newPassword);

      toastSuccess(formatMessage({ id: 'me.personalInfo.passwordChangedSuccessfully' }));

      closeDialog();
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
    }
  };

  return (
    <>
      <div className="flex flex-col pb-2">
        <p className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.password' })}</p>
        <p className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.changeYourPassword' })}
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
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPassword" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.newPassword' })}
                </FormLabel>
                <FormControl className="w-full">
                  <div className="relative">
                    <Input
                      placeholder={formatMessage({ id: 'me.personalInfo.enterNewPassword' })}
                      {...field}
                      type={showNewPassword ? 'text' : 'password'}
                      className="pr-10"
                    />
                    {!showNewPassword && (
                      <EyeOff
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        size={15}
                        onClick={() => setShowNewPassword(true)}
                      />
                    )}
                    {showNewPassword && (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        size={15}
                        onClick={() => setShowNewPassword(false)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="confirmNewPassword" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.confirmNewPassword' })}
                </FormLabel>
                <FormControl className="w-full">
                  <div className="relative">
                    <Input
                      placeholder={formatMessage({ id: 'me.personalInfo.confirmNewPassword' })}
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="pr-10"
                    />
                    {!showConfirmPassword && (
                      <EyeOff
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        size={15}
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                    {showConfirmPassword && (
                      <Eye
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        size={15}
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    )}
                  </div>
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
