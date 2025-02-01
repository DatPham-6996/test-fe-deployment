'use client';

import { OrganizerProvider } from '@/state-management/hooks/organizer/organizer-context';
import { useAuth } from '@/state-management/hooks/useAuth';
import { FlipOrganizerLayout } from './components/layout';
import { LeftNav } from './components/nav/LeftNav';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, openLoginModal } = useAuth();
  if (!isLoggedIn) {
    openLoginModal();
    return null;
  }

  return (
    <OrganizerProvider>
      <FlipOrganizerLayout className="bg-white dark:bg-black">
        <div className="flex flex-row min-h-screen w-full">
          <LeftNav />
          {children}
        </div>
      </FlipOrganizerLayout>
    </OrganizerProvider>
  );
}
