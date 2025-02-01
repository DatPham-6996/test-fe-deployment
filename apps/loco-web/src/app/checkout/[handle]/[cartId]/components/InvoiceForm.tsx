'use client';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, useFormField } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import classNames from 'classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toastError, toastSuccess } from '@/lib/utils/toast';

const InvoiceSchema = z.object({
  name: z.string().min(1, { message: 'checkout.invoice.nameRequired' }),
  email: z.string().email({ message: 'checkout.invoice.emailInvalid' }),
  phone: z
    .string()
    .min(10, { message: 'checkout.invoice.phoneInvalid' })
    .max(11, { message: 'checkout.invoice.phoneInvalid' }),
  address: z.string().min(1, { message: 'checkout.invoice.addressRequired' }),
  taxCode: z.string().nullable(),
});

export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;

type InvoiceFormProps = {
  data: InvoiceSchemaType | undefined;
  onChange: (data: InvoiceSchemaType) => Promise<void>;
  onRemove: () => Promise<void>;
  defaultValues?: {
    name?: string | undefined;
    email?: string | undefined;
    phone?: string | undefined;
  };
};

export function InvoiceForm({ data, onChange, onRemove, defaultValues }: InvoiceFormProps) {
  const { formatMessage } = useIntl();

  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      phone: defaultValues?.phone || '',
      address: '',
      taxCode: null,
    },
    values: data
      ? {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          taxCode: data.taxCode,
        }
      : undefined,
  });

  const onSubmit = async (values: InvoiceSchemaType) => {
    try {
      await onChange(values);
      toastSuccess(formatMessage({ id: 'checkout.invoice.updateSuccess' }));
    } catch (error) {
      toastError(formatMessage({ id: 'checkout.invoice.updateFailed' }));
      console.error('Failed to update invoice:', error);
    }
  };

  const InvoiceFormMessage = ({ defaultMessage }: { defaultMessage?: string }) => {
    const { error, formMessageId } = useFormField();
    const body = error ? formatMessage({ id: String(error?.message) }) : defaultMessage;

    if (!body) {
      return null;
    }

    return (
      <p
        id={formMessageId}
        className={classNames('text-[0.8rem] font-medium', error ? 'text-destructive' : 'text-blue-500')}
      >
        {body}
      </p>
    );
  };

  const RequiredIndicator = () => <span className="text-destructive pl-1">*</span>;

  return (
    <>
      <div className="flex flex-col">
        <p className="text-3xl font-semibold my-4">
          {formatMessage({
            id: 'checkout.invoice.heading',
          })}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {formatMessage({ id: 'checkout.invoice.name' })}
                    <RequiredIndicator />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={formatMessage({ id: 'checkout.invoice.namePlaceholder' })} {...field} />
                  </FormControl>
                  <InvoiceFormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {formatMessage({ id: 'checkout.invoice.address' })}
                    <RequiredIndicator />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={formatMessage({ id: 'checkout.invoice.addressPlaceholder' })} {...field} />
                  </FormControl>
                  <InvoiceFormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {formatMessage({ id: 'checkout.invoice.email' })}
                    <RequiredIndicator />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={formatMessage({ id: 'checkout.invoice.emailPlaceholder' })} {...field} />
                  </FormControl>
                  <InvoiceFormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {formatMessage({ id: 'checkout.invoice.phone' })}
                    <RequiredIndicator />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={formatMessage({ id: 'checkout.invoice.phonePlaceholder' })} {...field} />
                  </FormControl>
                  <InvoiceFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">
                    {formatMessage({ id: 'checkout.invoice.taxCode' })}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={formatMessage({ id: 'checkout.invoice.taxCodePlaceholder' })}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <InvoiceFormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row gap-2 mb-2 mt-2 items-end justify-end">
              <Button
                className="flex-1 w-full sm:w-min sm:min-w-32 sm:flex-none"
                size={'lg'}
                type="button"
                variant="ghost"
                disabled={form.formState.isSubmitting}
                onClick={onRemove}
              >
                {formatMessage({ id: 'checkout.invoice.remove' })}
              </Button>

              <Button
                className="flex-1 w-full sm:w-min sm:min-w-32 sm:flex-none"
                size={'lg'}
                type="submit"
                loading={form.formState.isSubmitting}
              >
                {formatMessage({ id: 'promotion.discount.editor.confirm' })}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
