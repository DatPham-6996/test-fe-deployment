'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Gender, useUpdatePersonalInfoMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { User } from 'firebase/auth';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { RadioGroup, RadioGroupItem } from '../shadcn/ui/radio-group';

export const GenderForm = ({
  gender,
  refetchUser,
  firebaseUser,
}: {
  gender?: Gender | null;
  refetchUser: () => void;
  firebaseUser: User;
}) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [updatePersonalInfo, { data, error }] = useUpdatePersonalInfoMutation();

  const formSchema = yup.object({
    gender: yup.string<Gender>().nullable(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      gender,
    },
  });

  const onSubmit = async (values: { gender?: Gender | null }) => {
    const { gender } = values;
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
            gender,
          },
        },
      });

      refetchUser();
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
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
        <p className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.gender' })}</p>
        <p className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.editGender' })}.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-2">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gender" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.gender' })}
                </FormLabel>
                <FormControl className="w-full pt-2 pl-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    className="flex space-x-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Gender.Male} />
                      </FormControl>
                      <FormLabel className="font-normal">{formatMessage({ id: 'me.personalInfo.male' })}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Gender.Female} />
                      </FormControl>
                      <FormLabel className="font-normal">{formatMessage({ id: 'me.personalInfo.female' })}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={Gender.Other} />
                      </FormControl>
                      <FormLabel className="font-normal">{formatMessage({ id: 'me.personalInfo.other' })}</FormLabel>
                    </FormItem>
                  </RadioGroup>
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
