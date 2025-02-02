import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import classnames from 'classnames';
import { User as FirebaseUser } from 'firebase/auth';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { ConfirmationDialog } from '../responsive-dialog/confirmation-dialog';
import { useResponsiveDialog } from '../responsive-dialog/responsive-dialog-context';
import { Button } from '../shadcn/ui/button';

export type HeaderProps = {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  openLoginModal?: () => void;
  avatarFallback?: string;
  currentUser?: FirebaseUser | null;
};

export function ProfileDropdown({
  openLoginModal,
  avatarFallback,
  onLogout,
  isLoggedIn = false,
  currentUser,
}: HeaderProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const firstCharName = avatarFallback?.charAt(0);
  const { openDialog } = useResponsiveDialog();

  const TextItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
      <p className={classnames('cursor-pointer hover:cursor-pointer text-s font-normal', className)}>{children}</p>
    );
  };

  const renderUserAvatar = () => (
    <div className="bg-slate-300 bg-opacity-40 rounded-full p-1.5 hover:visible invisible ">
      <Avatar className="w-[28px] h-[28px] hover:shadow-xl visible border border-muted">
        <AvatarImage src={currentUser?.photoURL ?? ''} alt="user-avatar" />
        <AvatarFallback className="bg-flip">
          {firstCharName && firstCharName.length > 0 ? firstCharName.toUpperCase() : <UserIcon size={19} />}
        </AvatarFallback>
      </Avatar>
    </div>
  );

  return (
    <>
      {!isLoggedIn && (
        <div
          className="flex hover:cursor-pointer items-center gap-2 group text-sm dark:text-neutral-100 text-neutral-600"
          onClick={openLoginModal}
        >
          <Button variant={'outline'}>{formatMessage({ id: 'header.login' })}</Button>
        </div>
      )}
      {isLoggedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Link href={''}>{renderUserAvatar()}</Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44" align="end">
            <Link href="/me/personal-info">
              <DropdownMenuItem className="hover:cursor-pointer">
                {renderUserAvatar()}
                <TextItem className="pl-2 font-semibold">{currentUser?.displayName}</TextItem>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/me/my-ticket')} className="hover:cursor-pointer">
              <TextItem>{formatMessage({ id: 'header.myTickets' })}</TextItem>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/me/my-order')} className="hover:cursor-pointer">
              <TextItem>{formatMessage({ id: 'header.order' })}</TextItem>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <Link href="https://help.flip.vn" target="_blank">
              <DropdownMenuItem className="hover:cursor-pointer">
                <TextItem>{formatMessage({ id: 'header.support' })}</TextItem>
              </DropdownMenuItem>
            </Link>
            <a data-tally-open="wgAoVJ">
              <DropdownMenuItem className="hover:cursor-pointer">
                <TextItem>{formatMessage({ id: 'header.request' })}</TextItem>
              </DropdownMenuItem>
            </a>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (onLogout) {
                  openDialog(<ConfirmationDialog action={onLogout} />);
                }
              }}
              className="hover:cursor-pointer"
            >
              <LogOutIcon className="mr-2 h-4 w-4" color="#737373" />
              <TextItem>{formatMessage({ id: 'header.logout' })}</TextItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
