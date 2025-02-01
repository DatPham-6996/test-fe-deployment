'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { firebaseAuth } from '@/lib/firebase';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';
import * as yup from 'yup';

export default function Component() {
  const { formatMessage } = useIntl();
  const { openLoginModal } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>();

  const actionCode = searchParams.get('actionCode');

  useEffect(() => {
    if (!actionCode) {
      router.replace('/not-found');
      return;
    }

    const verifyActionCode = async () => {
      try {
        const email = await verifyPasswordResetCode(firebaseAuth, actionCode);
        setEmail(email);
      } catch (error) {
        toastError(formatMessage({ id: 'authentication.error' }));
      }
    };

    verifyActionCode();
  }, [actionCode, router, formatMessage]);

  const PASSWORD_MIN_LENGTH = 8;
  const formSchema = yup.object({
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

  const onSubmit = async (values: { newPassword: string }) => {
    if (!actionCode) {
      return;
    }

    try {
      await confirmPasswordReset(firebaseAuth, actionCode, values.newPassword);
      toastSuccess(formatMessage({ id: 'authentication.resetPasswordSuccess' }));
      router.replace('/');
      openLoginModal();
    } catch (error) {
      toastError(formatMessage({ id: 'authentication.error' }));
    }
  };

  if (!email) {
    return <ClipLoader className="fixed top-1/2 left-1/2" />;
  }

  return (
    <div className="min-h-screen bg-gray flex justify-center align-middle">
      <div className="w-full max-w-sm">
        <Card className="bg-white dark:bg-gray-950 shadow-lg rounded-lg">
          <CardHeader className="space-y-1 p-6">
            <CardTitle className="text-2xl font-bold">
              {formatMessage({ id: 'authentication.resetPassword' })}
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              {formatMessage({ id: 'authentication.resetPasswordDes' })} <p className="font-semibold">{email}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4 pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword" className="text-sm font-medium">
                        {formatMessage({ id: 'me.personalInfo.newPassword' })}
                      </FormLabel>
                      <FormControl className="w-full">
                        <Input placeholder="Nhập mật khẩu mới" {...field} type="password" />
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
                        <Input placeholder="Nhập lại mật khẩu mới" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" loading={form.formState.isSubmitting}>
                  {formatMessage({ id: 'authentication.savePassword' })}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
