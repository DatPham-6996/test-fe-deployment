'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { useUpdatePersonalInfoMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { User } from 'firebase/auth';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';

export const PhoneNumberForm = ({
  phone,
  refetchUser,
  firebaseUser,
}: {
  phone?: string | null;
  refetchUser: () => void;
  firebaseUser: User;
}) => {
  const { formatMessage } = useIntl();
  const [updatePersonalInfo, { data, error }] = useUpdatePersonalInfoMutation();
  const { closeDialog } = useResponsiveDialog();

  const formSchema = yup.object({
    phone: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      phone: phone ?? '',
    },
  });
  const onSubmit = async (values: { phone: string }) => {
    const { phone } = values;

    if (!firebaseUser.emailVerified) {
      toastError(formatMessage({ id: 'me.personalInfo.requireEmailVerified' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    try {
      await updatePersonalInfo({
        variables: {
          data: {
            phone,
          },
        },
      });

      refetchUser();
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }));
    }
  };

  if (data) {
    toastSuccess(formatMessage({ id: 'me.personalInfo.updateSuccessfully' }), {
      toastId: 'me.personalInfo.updateSuccessfully',
    });
    closeDialog();
  }

  if (error) {
    toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
      toastId: 'me.personalInfo.updateFailed',
    });
    closeDialog();
  }

  return (
    <>
      <div className="flex flex-col pb-2">
        <h1 className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.editPhoneNumber' })}</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.phoneNumber' })}
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder={formatMessage({ id: 'me.personalInfo.enterPhoneNumber' })} {...field} />
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
