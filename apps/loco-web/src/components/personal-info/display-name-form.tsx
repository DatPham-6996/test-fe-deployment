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
import { gql } from '@apollo/client';
import { User, updateProfile } from 'firebase/auth';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';

const UPDATE_PERSONAL_INFO = gql(`
  mutation UpdatePersonalInfo($data: UpdatePersonalInfoInput!) {
    updatePersonalInfo(data: $data) {
      id
    }
  }`);

export const DisplayNameForm = ({
  displayName,
  firebaseUser,
  refetchUser,
}: {
  displayName: string;
  firebaseUser: User;
  refetchUser: () => void;
}) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [updatePersonalInfo, { data, error }] = useUpdatePersonalInfoMutation();

  const formSchema = yup.object({
    displayName: yup.string().required(formatMessage({ id: 'authentication.validation.nameRequired' })),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      displayName,
    },
  });

  const onSubmit = async (values: { displayName: string }) => {
    const { displayName } = values;
    if (!firebaseUser.emailVerified) {
      toastError(formatMessage({ id: 'me.personalInfo.requireEmailVerified' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    try {
      if (firebaseUser) {
        await updateProfile(firebaseUser, {
          displayName,
        });

        await updatePersonalInfo({
          variables: {
            data: {
              displayName,
            },
          },
        });

        refetchUser();
      }
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
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.editYourFullName' })}</h1>
        <p className="text-sm font-normal">{formatMessage({ id: 'me.personalInfo.editNameDescription' })}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="displayName" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.fullName' })}
                </FormLabel>
                <FormControl>
                  <Input placeholder={formatMessage({ id: 'me.personalInfo.enterFullName' })} {...field} />
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
