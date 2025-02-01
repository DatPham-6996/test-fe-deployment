import { LinkButton } from '@/components/nav/header/Header';
import { ProfileDropdown } from '@/components/nav/header/ProfileDropdown';
import { Settings } from '@/components/settings/settings';
import { Separator } from '@/components/shadcn/ui/separator';
import SystemClock from '@/components/system-clock';
import classnames from 'classnames';
import { User as FirebaseUser } from 'firebase/auth';
import { ArrowLeftRightIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import { useIntl } from 'react-intl';

export type HeaderProps = {
  className?: string;
  isLoggedIn?: boolean;
  openLoginModal?: () => void;
  onLogout?: () => void;
  avatarFallback?: string;
  currentUser?: FirebaseUser | null;
  fixed?: boolean;
  showDivider?: boolean;
};

export function OrganizerHeader({
  avatarFallback,
  className,
  openLoginModal,
  onLogout,
  isLoggedIn = false,
  currentUser,
  fixed = false,
  showDivider = false,
}: HeaderProps) {
  const { formatMessage } = useIntl();
  const router = useRouter();
  return (
    <header
      className={classnames('flex flex-col justify-center items-center w-full', {
        'fixed left-0 right-0 top-0 z-10 backdrop-blur-xl ': fixed,
      })}
    >
      <div className={classnames('flex h-14 justify-between px-3 w-full', className)}>
        {/* Left */}
        <div className="flex md:gap-6 gap-4 items-center"></div>

        {/* Right */}
        <div className="flex flex-row gap-4 md:gap-1 items-center">
          <div className="mr-4">
            <SystemClock />
          </div>
          {isLoggedIn && (
            <LinkButton
              href="/"
              title={formatMessage({ id: 'header.fanMode' })}
              icon={<ArrowLeftRightIcon className=" h-4 w-4 " />}
            />
          )}

          <Settings />

          <ProfileDropdown
            openLoginModal={openLoginModal}
            avatarFallback={avatarFallback}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
        </div>
      </div>
      {showDivider && <Separator className="bg-neutral-300 dark:bg-muted" />}
    </header>
  );
}
