import { Settings } from '@/components/settings/settings';
import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderProps } from '../header/Header';
import { ProfileDropdown } from '../header/ProfileDropdown';

function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col items-center justify-center', className)}>{children}</div>;
}

export default function MobileHeader({
  avatarFallback,
  className,
  openLoginModal,
  onLogout,
  isLoggedIn = false,
  fixed = false,
  currentUser,
  forceDarkMode = false,
}: HeaderProps) {
  let isDarkMode = useIsDarkTheme();
  if (forceDarkMode) {
    isDarkMode = true;
  }

  return (
    <div
      className={cn(
        'bg-transparent border-t border-gray-200 dark:border-gray-700 px-2 py-1',
        fixed && 'fixed top-0 left-0 right-0 z-50',
        className
      )}
    >
      <nav className="flex justify-between items-center">
        <div className="flex flex-row gap-2">
          <Item>
            <Settings />
          </Item>

          <Item>
            <Link href={'/'}>
              <Image
                src={isDarkMode ? '/icons/flip-dark.png' : '/icons/flip-light.png'}
                alt="flip logo"
                width={60}
                height={60}
              />
            </Link>
          </Item>
        </div>

        <Item>
          <ProfileDropdown
            openLoginModal={openLoginModal}
            avatarFallback={avatarFallback}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
          />
          {/* <p className="text-xs">{formatMessage({ id: 'navBar.mobile.profile' })}</p> */}
        </Item>
      </nav>
    </div>
  );
}
