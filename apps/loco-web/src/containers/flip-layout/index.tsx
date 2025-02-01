'use client';

import MobileHeader from '@/components/nav/bottom-nav/mobile-header';
import { Footer } from '@/components/nav/footer/Footer';
import Header from '@/components/nav/header/Header';
import { useAuth } from '@/state-management/hooks/useAuth';
import classnames from 'classnames';
import { isMobile } from 'react-device-detect';

// Add the new prop 'backgroundImageUrl' to your LayoutProps type
export type LayoutProps = {
  children: React.ReactNode;
  showHeaderDivider?: boolean;
  fixed?: boolean;
  hideFooter?: boolean;
  mobileNav?: boolean;
  className?: string;
  showLegal?: boolean;
  backgroundImageUrl?: string | undefined | null;
  headerOnly?: boolean;
  footerOnly?: boolean;
  forceDarkMode?: boolean;
};

export function FlipLayout({
  children,
  showHeaderDivider,
  fixed,
  hideFooter,
  mobileNav,
  className,
  showLegal = false,
  backgroundImageUrl,
  headerOnly = false,
  footerOnly = false,
  forceDarkMode = false,
}: LayoutProps) {
  const { openLoginModal, onSignOut, isLoggedIn, currentUser } = useAuth();
  const useMobileNav = mobileNav !== undefined ? mobileNav : isMobile;

  return (
    <div
      className={classnames(
        'flex flex-col relative', // Make the parent div relative
        {
          'bg-gray': !showHeaderDivider,
        },
        className
      )}
    >
      {!footerOnly &&
        <>
          {backgroundImageUrl && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
                filter: 'blur(8px)',
                zIndex: -1, // Ensure it sits behind your content
              }}
            />
          )}
          {!useMobileNav && (
            <Header
              avatarFallback={currentUser?.displayName || ''}
              isLoggedIn={isLoggedIn}
              openLoginModal={openLoginModal}
              onLogout={onSignOut}
              currentUser={currentUser}
              fixed={fixed}
              showDivider={showHeaderDivider}
              forceDarkMode={forceDarkMode}
            />
          )}
          {useMobileNav && (
            <MobileHeader
              avatarFallback={currentUser?.displayName || ''}
              isLoggedIn={isLoggedIn}
              openLoginModal={openLoginModal}
              onLogout={onSignOut}
              currentUser={currentUser}
              fixed={fixed}
              showDivider={showHeaderDivider}
              forceDarkMode={forceDarkMode}
            />
          )}
        </>
      }
      <main>{children}</main>

      {!headerOnly &&
        <>
          {!hideFooter && <Footer showLegal={showLegal} />}
          {useMobileNav && <div className="h-20" />}
        </>
      }
    </div>
  );
}
