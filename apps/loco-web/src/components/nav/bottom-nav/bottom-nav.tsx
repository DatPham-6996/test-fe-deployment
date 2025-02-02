import { Settings } from '@/components/settings/settings';
import { Button } from '@/components/shadcn/ui/button';
import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { ArrowLeftRightIcon, TicketIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import { HeaderProps } from '../header/Header';
import { ProfileDropdown } from '../header/ProfileDropdown';

function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex flex-col items-center justify-center', className)}>{children}</div>;
}

export default function BottomNav({
  avatarFallback,
  className,
  openLoginModal,
  onLogout,
  isLoggedIn = false,
  currentUser,
}: HeaderProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const isDarkMode = useIsDarkTheme();

  return (
    <div
      className={cn(
        ' bg-transparent dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pb-2',
        className
      )}
    >
      <nav className="flex justify-between items-center">
        <Item>
          <Button variant="ghost" onClick={() => router.push('/')} className="">
            <Image
              src={isDarkMode ? '/icons/flip-dark.png' : '/icons/flip-light.png'}
              alt="flip logo"
              width={52}
              height={52}
              priority
            />
          </Button>
          {/* <p className="text-xs">{formatMessage({ id: 'navBar.mobile.discover' })}</p> */}
        </Item>

        <Item>
          <Button
            variant="ghost"
            size={'icon'}
            onClick={() => router.push('/me/my-ticket')}
            className="flex flex-col justify-center items-center text-sm dark:text-neutral-100 text-neutral-600"
          >
            <TicketIcon size={20} />
          </Button>
          <p className="text-xs">{formatMessage({ id: 'navBar.mobile.myTickets' })}</p>
        </Item>

        {isLoggedIn && (
          <Item>
            <Button
              variant="ghost"
              size={'icon'}
              onClick={() => router.push('/organizer')}
              className="flex items-center gap-2 group text-sm dark:text-neutral-100 text-neutral-600"
            >
              <ArrowLeftRightIcon size={20} />
            </Button>
            <p className="text-xs">{formatMessage({ id: 'navBar.mobile.organizer' })}</p>
          </Item>
        )}

        <Item>
          <Settings />
          <p className="text-xs">{formatMessage({ id: 'settings.title' })}</p>
        </Item>

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
