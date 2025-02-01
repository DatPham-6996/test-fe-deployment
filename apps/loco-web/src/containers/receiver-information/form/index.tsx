import { ErrorInputWrapper } from '@/components/error-input-wrapper';
import { InputLabel } from '@/components/error-input-wrapper/InputLabel';
import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { validateYupSchema } from '@/lib/utils/format';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import type { Customer } from '@medusajs/medusa';
import { useQueryClient } from '@tanstack/react-query';
import { customerKeys, useUpdateMe } from 'medusa-react';
import { Field, Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { getReceiverInformationSchema } from './schema';

type FormValues = {
  name: string;
  email: string;
  phone: string;
};

type ReceiverInformationFormProps = {
  customer: Omit<Customer, 'password_hash'> | undefined;
  onCancel?: () => void;
};

export function ReceiverInformationForm({ customer, onCancel }: ReceiverInformationFormProps) {
  const intl = useIntl();
  const updateMe = useUpdateMe();
  const queryClient = useQueryClient();
  const { formatMessage } = intl;

  const initialValues = {
    name: customer?.first_name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    // address: (customer?.shipping_addresses?.[0]?.metadata.street || '') as string,
    // city: (customer?.shipping_addresses?.[0]?.metadata.city || DEFAULT_CITY) as LocationData,
    // district: customer?.shipping_addresses?.[0]?.metadata.district as LocationData,
    // ward: customer?.shipping_addresses?.[0]?.metadata.ward as LocationData,
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await updateMe.mutateAsync({
        id: customer?.id as string,
        first_name: values.name,
        email: values.email,
        phone: values.phone,
      });
      // After update, the modal will be closed
      // And we need to update the customer detail in the cache
      queryClient.invalidateQueries({ queryKey: customerKeys.detail('me') });
      toastSuccess(intl.formatMessage({ id: 'checkout.notification.addressSavedSuccessfully' }));
      onCancel && onCancel();
    } catch (error: any) {
      toastError(error.message);
    }
  };

  const handleCancel = () => onCancel && onCancel();

  return (
    <Form<FormValues>
      validate={validateYupSchema(getReceiverInformationSchema(intl))}
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitSucceeded, submitError }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <InputLabel title={formatMessage({ id: 'checkout.form.name' })} />
                <Field name="name" required>
                  {(field) => (
                    <ErrorInputWrapper field={field}>
                      <Input
                        disabled={submitting}
                        placeholder={formatMessage({ id: 'checkout.form.namePlaceholder' })}
                        {...field.input}
                        type="text"
                      />
                    </ErrorInputWrapper>
                  )}
                </Field>
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel title={formatMessage({ id: 'checkout.form.email' })} />
                <Field name="email" required>
                  {(field) => (
                    <ErrorInputWrapper field={field}>
                      <Input
                        disabled={submitting}
                        placeholder={formatMessage({ id: 'checkout.form.emailPlaceholder' })}
                        {...field.input}
                        type="email"
                      />
                    </ErrorInputWrapper>
                  )}
                </Field>
              </div>

              <div className="flex flex-col gap-1">
                <InputLabel title={formatMessage({ id: 'checkout.form.phone' })} />
                <Field name="phone" required>
                  {(field) => (
                    <ErrorInputWrapper field={field}>
                      <Input
                        disabled={submitting}
                        placeholder={formatMessage({ id: 'checkout.form.phonePlaceholder' })}
                        {...field.input}
                        type="tel"
                      />
                    </ErrorInputWrapper>
                  )}
                </Field>
              </div>

              <div className="flex mt-1 justify-between gap-3">
                <div className="w-full">
                  <Button onClick={handleCancel} variant="secondary" fullWidth>
                    {formatMessage({ id: 'checkout.receiverInfo.cancelButton' })}
                  </Button>
                </div>
                <div className="w-full">
                  <Button type="submit" fullWidth loading={submitting} error={submitError} success={submitSucceeded}>
                    {formatMessage({ id: 'checkout.receiverInfo.confirmationButton' })}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    />
  );
}
