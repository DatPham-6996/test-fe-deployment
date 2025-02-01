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

export const IdentityNumberForm = ({
  identityNumber,
  refetchUser,
  firebaseUser,
}: {
  identityNumber?: string | null;
  refetchUser: () => void;
  firebaseUser: User;
}) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [updatePersonalInfo, { data, error }] = useUpdatePersonalInfoMutation();

  const formSchema = yup.object({
    identityNumber: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      identityNumber: identityNumber ?? '',
    },
  });

  const onSubmit = async (values: { identityNumber?: string }) => {
    const { identityNumber } = values;

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
            identityNumber,
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
        <p className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.identityNumber' })}</p>
        <p className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.editIdentityNumber' })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="identityNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="identityNumber" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.identityNumber' })}
                </FormLabel>
                <FormControl className="w-full">
                  <Input placeholder={formatMessage({ id: 'me.personalInfo.enterIdentityNumber' })} {...field} />
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
