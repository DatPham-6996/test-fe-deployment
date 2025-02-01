import { validateYupSchema } from '@/lib/utils/format';
import { Field, Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { ErrorInputWrapper } from '../error-input-wrapper';
import { InputLabel } from '../error-input-wrapper/InputLabel';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { getSignUpSchema } from './schema';

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
};

export const EmailSignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  return (
    <Form<SignUpFormValues>
      onSubmit={onSubmit}
      validate={validateYupSchema(getSignUpSchema(intl))}
      render={({ handleSubmit, submitting, submitSucceeded, submitError, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="w-full">
                  <InputLabel title={formatMessage({ id: 'authentication.name' })} />
                  <Field name="name" required>
                    {(field) => (
                      <ErrorInputWrapper field={field}>
                        <Input
                          disabled={submitting}
                          placeholder={formatMessage({ id: 'authentication.namePlaceholder' })}
                          {...field.input}
                          type="text"
                        />
                      </ErrorInputWrapper>
                    )}
                  </Field>
                </div>
              </div>

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

              <div className="flex gap-3">
                <div className="w-full">
                  <InputLabel title={formatMessage({ id: 'authentication.password' })} />
                  <Field name="password" required>
                    {(field) => (
                      <ErrorInputWrapper field={field}>
                        <Input
                          disabled={submitting}
                          placeholder={formatMessage({ id: 'authentication.passwordPlaceholder' })}
                          {...field.input}
                          type={'password'}
                        />
                      </ErrorInputWrapper>
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-full">
                  <InputLabel title={formatMessage({ id: 'authentication.repassword' })} />
                  <Field name="repassword" required>
                    {(field) => (
                      <ErrorInputWrapper field={field}>
                        <Input
                          disabled={submitting}
                          placeholder={formatMessage({ id: 'authentication.repasswordPlaceholder' })}
                          {...field.input}
                          type={'password'}
                        />
                      </ErrorInputWrapper>
                    )}
                  </Field>
                </div>
              </div>

              <Button loading={submitting} error={submitError} success={submitSucceeded}>
                {formatMessage({ id: 'authentication.signUpWithEmail' })}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};
