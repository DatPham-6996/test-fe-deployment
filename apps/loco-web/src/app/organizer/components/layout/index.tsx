'use client';

import { Footer } from '@/components/nav/footer/Footer';
import { useOrganizerContext } from '@/state-management/hooks/organizer/organizer-context';
import { useAuth } from '@/state-management/hooks/useAuth';
import { default as classnames, default as classNames } from 'classnames';
import { isMobile } from 'react-device-detect';
import { OrganizerHeader } from '../header/OrganizerHeader';

export type LayoutProps = {
  children: React.ReactNode;
  showHeaderDivider?: boolean;
  fixed?: boolean;
  hideFooter?: boolean;
  className?: string;
};

export function FlipOrganizerLayout({ children, showHeaderDivider, fixed: fixed, hideFooter, className }: LayoutProps) {
  const { openLoginModal, onSignOut, isLoggedIn, currentUser } = useAuth();
  const { state } = useOrganizerContext();
  return (
    <div
      className={classNames({
        'sm:pl-16': state.isSidenavCollapsed,
        'sm:pl-64': !state.isSidenavCollapsed && !isMobile,
      })}
    >
      <div
        className={classnames(
          'flex flex-col min-h-screen',
          {
            'bg-gray': !showHeaderDivider,
          },
          className
        )}
      >

        <OrganizerHeader
          avatarFallback={currentUser?.displayName || ''}
          isLoggedIn={isLoggedIn}
          openLoginModal={openLoginModal}
          onLogout={onSignOut}
          currentUser={currentUser}
          fixed={fixed}
          showDivider={showHeaderDivider}
        />
        <main className="flex-1">{children}</main>
        {!hideFooter && <Footer showDownloadOrgApp={true} />}
      </div>
    </div>

  );
}
