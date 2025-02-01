import { InBrowserWarning } from '@/components/call-out/InBrowserWarning';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { authWithFirebase } from '@/lib/api/flip-ticketing/v1/authFirebase';
import { firebaseAuth } from '@/lib/firebase';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { isInAppBrowser } from '@/lib/utils/client-utils';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { KeyRoundIcon, LockIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useIntl } from 'react-intl';

export default function PasswordSignInToggle({
  onClick,
  isUsingPasswordlessLogin,
}: {
  onClick: () => void;
  isUsingPasswordlessLogin: boolean;
}) {
  const { formatMessage } = useIntl();

  return (
    <Button onClick={onClick} variant="secondary">
      <div className="flex gap-2 items-center">
        {isUsingPasswordlessLogin ? <KeyRoundIcon size={20} /> : <LockIcon size={20} />}
        {isUsingPasswordlessLogin
          ? formatMessage({ id: 'authentication.loginWithPassword' })
          : formatMessage({ id: 'authentication.loginWithPasswordless' })}
      </div>
    </Button>
  );
}
