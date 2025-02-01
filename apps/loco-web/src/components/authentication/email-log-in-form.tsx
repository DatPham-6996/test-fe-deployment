import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { validateYupSchema } from '@/lib/utils/format';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { signInWithCustomToken, signInWithEmailAndPassword } from 'firebase/auth';
import { Field, Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { ErrorInputWrapper } from '../error-input-wrapper';
import { Button } from '../shadcn/ui/button';
import { Input } from '../shadcn/ui/input';
import { getLoginSchema } from './schema';
import { LogInIcon } from 'lucide-react';

type LoginFormValues = {
  email: string;
  password: string;
};

export function EmailAndPasswordLoginForm({ onOpenSignUp }: { onOpenSignUp: () => void }) {
  const intl = useIntl();
  const { formatMessage } = intl;
  const { openForgotPasswordModal } = useAuth();
  const { closeLoginModal } = useAuth();
  const { logEvent } = useLogEvent();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, values.email, values.password);
      closeLoginModal();
      toastSuccess(formatMessage({ id: 'authentication.loginSuccessfully' }));
      logEvent({
        eventName: 'logged_in',
        value: values.email,
        metadata: { view: 'web' },
      });
    } catch (e) {
      console.error('Login failed: ', e);
      toastError(formatMessage({ id: 'authentication.loginFailed' }));
    }
  };

  return (
    <Form<LoginFormValues>
      onSubmit={onSubmit}
      validate={validateYupSchema(getLoginSchema(intl))}
      render={({ handleSubmit, submitting, submitSucceeded, submitError, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="rounded-full bg-secondary w-fit p-4">
              <LogInIcon size={20} />
            </div>
            <p className="text-3xl font-semibold">{formatMessage({ id: 'authentication.login' })}</p>
            <p className="text-sm flex gap-1 items-center mb-2">
              {formatMessage({ id: 'authentication.havingAccountYet' })}
              <a onClick={onOpenSignUp} className="cursor-pointer ">
                <span className="text-base font-semibold dark:text-yellow-400 text-blue-500">
                  {formatMessage({ id: 'authentication.signUp' })}
                </span>
              </a>
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 w-full">
                {/* <InputLabel title={formatMessage({ id: 'authentication.email' })} /> */}
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

              <div className="flex flex-col gap-1 w-full">
                {/* <InputLabel title={formatMessage({ id: 'authentication.password' })} /> */}
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

              <div className="flex flex-row justify-end">
                <a onClick={openForgotPasswordModal} className="cursor-pointer">
                  <p className="text-blue-500 text-sm ">{formatMessage({ id: 'authentication.forgotPassword' })}</p>
                </a>
              </div>

              <Button loading={submitting} error={submitError} success={submitSucceeded} className="mt-2">
                {formatMessage({ id: 'authentication.loginWithEmail' })}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
}
