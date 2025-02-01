'use client';

import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { useUpdateCartMetadataMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

export function UpdateUserPhoneTicketForm({
  phone,
  setPhone,
  cartId,
}: {
  phone: string | null;
  setPhone: (phone: string | null) => void;
  cartId: string;
}) {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [updateCartMetadata] = useUpdateCartMetadataMutation();

  const phoneSchema = z.object({
    newPhone: z
      .string()
      .nullable()
      .transform((val) => val?.trim() ?? '')
      .refine((val) => {
        const cleanedNumber = val.replace(/[\s()-]/g, '');
        return /^[+]?\d{8,15}$/.test(cleanedNumber);
      }, {
        message: formatMessage({
          id: 'validation.phoneNumber',
          defaultMessage: 'Please enter a valid phone number'
        })
      })
      .transform((val) => {
        if (!val) return null;
        return val.replace(/[\s()-]/g, '');
      }),
  });

  type PhoneSchemaType = z.infer<typeof phoneSchema>;

  const form = useForm<PhoneSchemaType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      newPhone: phone ?? '',
    },
  });

  const onSubmit = async ({ newPhone }: PhoneSchemaType) => {
    try {
      await updateCartMetadata({
        variables: {
          input: {
            cartId,
            metadata: {
              userPhoneForTicket: newPhone || null,
            },
          },
        },
        onCompleted: () => {
          setPhone(newPhone);
          toastSuccess(formatMessage({ id: 'me.personalInfo.updateSuccessfully' }), {
            toastId: 'me.personalInfo.updateSuccessfully',
          });
          closeDialog();
        },
      });
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), {
        toastId: 'me.personalInfo.updateFailed'
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-normal">
          {formatMessage({ id: 'checkout.receiverInfo.editPhoneNumber' })}
        </p>
        <p className="text-sm text-muted-foreground">
          {formatMessage({ id: 'checkout.receiverInfo.phoneDescription' })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="newPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newPhone" className="text-sm font-medium">
                  {formatMessage({ id: 'checkout.receiverInfo.phone' })}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    type="tel"
                    placeholder={formatMessage({
                      id: 'me.personalInfo.enterPhoneNumber',
                      defaultMessage: 'Enter phone number'
                    })}
                    className="font-mono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
          >
            {formatMessage({ id: 'me.personalInfo.update' })}
          </Button>
        </form>
      </Form>
    </>
  );
}
