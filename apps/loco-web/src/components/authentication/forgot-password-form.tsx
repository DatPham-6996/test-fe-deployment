import { validateYupSchema } from '@/lib/utils/format';
import { Field, Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { ErrorInputWrapper } from '../error-input-wrapper';
import { InputLabel } from '../error-input-wrapper/InputLabel';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { getForgotPasswordSchema } from './schema';

export type ForgotPasswordFormValues = {
  email: string;
};

export type ForgotPasswordFormProps = {
  onSubmit: (values: ForgotPasswordFormValues) => void;
};

export const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const onOpenForgotPasswordModal = () => {};

  return (
    <Form<ForgotPasswordFormValues>
      onSubmit={onSubmit}
      validate={validateYupSchema(getForgotPasswordSchema(intl))}
      render={({ handleSubmit, submitting, submitSucceeded, submitError, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="w-full">
                  <InputLabel title={formatMessage({ id: 'authentication.email' })} />
                  <Field name="email" required>
                    {(field) => (
                      <ErrorInputWrapper field={field}>
                        <Input
                          disabled={submitting}
                          placeholder={formatMessage({ id: 'authentication.emailPlaceholder' })}
                          {...field.input}
                          type="email"
                        />
                      </ErrorInputWrapper>
                    )}
                  </Field>
                </div>
              </div>

              <Button loading={submitting} error={submitError} success={submitSucceeded}>
                {formatMessage({ id: 'authentication.verifyEmail' })}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};
