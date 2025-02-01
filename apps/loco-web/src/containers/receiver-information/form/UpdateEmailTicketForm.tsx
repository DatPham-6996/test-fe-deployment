'use client';

import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { useUpdateCartMetadataMutation } from '@/lib/__generated__/graphql';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function UpdateEmailTicketForm({
  email,
  setEmail,
  cartId,
}: {
  email: string;
  setEmail: (email: string) => void;
  cartId: string;
}) {
  const { formatMessage } = useIntl();
  const { closeDialog } = useResponsiveDialog();
  const [updateCartMetadata, { data, error }] = useUpdateCartMetadataMutation();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        newEmail: z.string().email(),
      })
    ),
    defaultValues: {
      newEmail: email,
    },
  });

  const onSubmit = async ({ newEmail }: { newEmail: string }) => {
    try {
      updateCartMetadata({
        variables: {
          input: {
            cartId: cartId,
            metadata: {
              emailForTicket: newEmail,
            },
          },
        },
        onCompleted: (data) => {
          setEmail(newEmail);
          toastSuccess(formatMessage({ id: 'me.personalInfo.updateSuccessfully' }), {
            toastId: 'me.personalInfo.updateSuccessfully',
          });
        },
      });
    } catch (error) {
      toastError(formatMessage({ id: 'me.personalInfo.updateFailed' }), { toastId: 'me.personalInfo.updateFailed' });
    } finally {
      closeDialog();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-normal">{formatMessage({ id: 'checkout.receiverInfo.updateReceiverEmail' })}</p>
        <p className="text-sm font-normal">
          {formatMessage({ id: 'checkout.receiverInfo.updateReceiverEmailDescription' })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="newEmail" className="text-sm font-medium">
                  {formatMessage({ id: 'checkout.receiverInfo.receiveTicketEmail' })}
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
}
