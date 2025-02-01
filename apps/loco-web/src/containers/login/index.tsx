import { EmailAndPasswordLoginForm } from '@/components/authentication/email-log-in-form';
import { Separator } from '@/components/shadcn/ui/separator';
import { isInAppBrowser } from '@/lib/utils/client-utils';
import { useIntl } from 'react-intl';
import AppleSignInButton from './components/apple-sign-in-button';
import GoogleSignInButton from './components/google-sign-in-button';
import { useState } from 'react';
import { PasswordlessLoginForm } from '@/components/authentication/passwordless-log-in-form';
import PasswordSignInToggle from './components/password-sign-in-toggle';

type LoginProps = {
  onOpenSignUp: () => void;
};

export const Login = ({ onOpenSignUp }: LoginProps) => {
  const { formatMessage } = useIntl();
  const [isUsingPasswordlessLogin, setIsUsingPasswordlessLogin] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 -mt-2">
        {isUsingPasswordlessLogin ? (
          <PasswordlessLoginForm />
        ) : (
          <EmailAndPasswordLoginForm onOpenSignUp={onOpenSignUp} />
        )}
      </div>

      <Separator />
      <div className="flex flex-col gap-3">
        <PasswordSignInToggle
          onClick={() => setIsUsingPasswordlessLogin(!isUsingPasswordlessLogin)}
          isUsingPasswordlessLogin={isUsingPasswordlessLogin}
        />
        {!isInAppBrowser() && (
          <div className="flex flex-col gap-3">
            <GoogleSignInButton />
            <AppleSignInButton />
          </div>
        )}
      </div>
    </div>
  );
};
