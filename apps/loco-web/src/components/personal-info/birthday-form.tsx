'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { useUpdatePersonalInfoMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { isValid, parse } from 'date-fns';
import { format } from 'date-fns-tz';
import { User } from 'firebase/auth';
import { Calendar } from '../icon/Calendar';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { Input } from '../shadcn/ui/input';

export const BirthdayForm = ({
  birthday,
  refetchUser,
  firebaseUser,
}: {
  birthday?: Date;
  refetchUser: () => void;
  firebaseUser: User;
}) => {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [updatePersonalInfo, { data, error }] = useUpdatePersonalInfoMutation();

  const formSchema = yup.object({
    birthday: yup
      .string()
      .matches(
        /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(18|19|20|21|22)\d{2}$/,
        formatMessage({ id: 'me.personalInfo.birthdayInvalid' })
      ),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      birthday: birthday ? format(birthday, 'MM/dd/yyyy') : undefined,
    },
  });

  const onSubmit = async (values: { birthday?: string }) => {
    const { birthday } = values;

    if (!firebaseUser.emailVerified) {
      toastError(formatMessage({ id: 'me.personalInfo.requireEmailVerified' }), {
        toastId: 'me.personalInfo.updateFailed',
      });
      return;
    }

    if (!birthday || !isValid(parse(birthday, 'MM/dd/yyyy', new Date()))) {
      toastError(formatMessage({ id: 'me.personalInfo.birthdayInvalid' }), {
        toastId: 'me.personalInfo.birthdayInvalid',
      });
      return;
    }

    try {
      await updatePersonalInfo({
        variables: {
          data: {
            birthday: parse(birthday, 'MM/dd/yyyy', new Date()),
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
        <p className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.birthday' })}</p>
        <p className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.birthdayDescription' })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="birthday" className="text-sm font-medium">
                  {formatMessage({ id: 'me.personalInfo.birthday' })}
                </FormLabel>
                <FormControl className="w-full">
                  <div className="w-full relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input
                      className="pl-10"
                      placeholder={formatMessage({ id: 'me.personalInfo.enterBirthday' })}
                      {...field}
                      onChange={(e) => {
                        let inputValue = e.target.value;

                        if ([3, 6].includes(inputValue.length) && inputValue[inputValue.length - 1] === '/') {
                          field.onChange(inputValue);
                          return;
                        }

                        if ([4, 7].includes(inputValue.length) && inputValue[inputValue.length - 1] === '/') {
                          return;
                        }

                        // Remove non-numeric characters
                        inputValue = inputValue.replace(/\D/g, '');

                        // Format date as MM/dd/yyyy
                        if (inputValue.length <= 2) {
                          field.onChange(inputValue);
                        } else if (inputValue.length <= 4) {
                          field.onChange(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`);
                        } else {
                          field.onChange(
                            `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`
                          );
                        }
                      }}
                      maxLength={10}
                    />
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
