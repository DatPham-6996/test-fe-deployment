import { FlipLogo } from '@/components/icon/FlipLogo';
import { Settings } from '@/components/settings/settings';
import { Button } from '@/components/shadcn/ui/button';
import { Separator } from '@/components/shadcn/ui/separator';
import SystemClock from '@/components/system-clock';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import classnames from 'classnames';
import { User as FirebaseUser } from 'firebase/auth';
import { ArrowLeftRightIcon, TicketIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { ProfileDropdown } from './ProfileDropdown';

export type HeaderProps = {
  className?: string;
  isLoggedIn?: boolean;
  openLoginModal?: () => void;
  onLogout?: () => void;
  avatarFallback?: string;
  currentUser?: FirebaseUser | null;
  fixed?: boolean;
  showDivider?: boolean;
  forceDarkMode?: boolean;
};

export function LinkButton({ href, title, icon }: { href: string; title?: string; icon: React.ReactNode }) {
  const router = useRouter();
  return (
    <Button
      variant={'ghost'}
      onClick={() => router.push(href)}
      className="flex justify-center items-center gap-2 group text-sm dark:text-neutral-100 text-neutral-600"
    >
      <div className="h-4 w-4">{icon}</div>
      {title && <p className="hidden md:block text-sm font-normal">{title}</p>}
    </Button>
  );
}

export default function Header({
  avatarFallback,
  className,
  openLoginModal,
  onLogout,
  isLoggedIn = false,
  currentUser,
  fixed = false,
  showDivider = false,
  forceDarkMode = false,
}: HeaderProps) {
  const { formatMessage } = useIntl();
  let isDarkMode = useIsDarkTheme();
  if (forceDarkMode) {
    isDarkMode = true;
  }

  return (
    <header
      className={classnames('flex flex-col justify-center items-center w-full bg-transparent bg-opacity-80 shadow-sm', {
        'fixed left-0 right-0 top-0 z-10 backdrop-blur-xl ': fixed,
      })}
    >
      <div className={classnames('flex h-14 justify-between px-4 py-4 w-full max-w-[1200px]', className)}>
        <div className="flex md:gap-6 gap-4 items-center justify-center">
          <Link href={'/'} className="mb-2">
            <FlipLogo width={62} height={62} />
          </Link>

          {isLoggedIn && (
            <LinkButton
              href="/organizer"
              icon={<ArrowLeftRightIcon className="h-4 w-4" />}
              title={formatMessage({ id: 'header.hostMode' })}
            />
          )}

          {/* Uncomment if needed
          {gate && (
            <Link className="flex items-center gap-2 group text-sm text-muted-foreground" href="/discover">
              <CompassIcon size={16} />
              <p className="hidden md:block text-sm">{formatMessage({ id: 'header.explore' })}</p>
            </Link>
          )} */}
        </div>

        <div className="flex flex-row gap-2 items-center">
          <div className="mr-4">
            <SystemClock />
          </div>

          {isLoggedIn && (
            <LinkButton
              href="/me/my-ticket"
              icon={<TicketIcon size={16} />}
              title={formatMessage({ id: 'header.myTickets' })}
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
