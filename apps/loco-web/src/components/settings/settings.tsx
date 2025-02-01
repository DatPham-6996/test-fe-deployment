import { ArrowLeftRightIcon, Home, MenuIcon, SettingsIcon, TicketIcon } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';

import { Button } from '@/components/shadcn/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcn/ui/sheet';
import { useAuth } from '@/state-management/hooks/useAuth';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { DarkModeSwitch } from '../mode/DarkModeSwitch';
import { LocaleSwitch } from '../mode/LocaleSwitch';
import { Separator } from '../shadcn/ui/separator';

export function Settings() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { isLoggedIn } = useAuth();
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        {isMobile ? (
          <Button size="icon" variant="ghost" className="rounded-full bg-muted">
            <MenuIcon size={20} />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className="text-sm dark:text-neutral-100 text-neutral-600">
            <SettingsIcon size={18} />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="left"
        className="sm:max-w-xs px-0 pt-16 dark:bg-black dark:text-neutral-100 text-neutral-600 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold text-foreground px-4">Menu</p>
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="flex justify-start items-center gap-2 text-base px-4"
          >
            <Home size={20} />
            <p className="font-medium text-foreground">{formatMessage({ id: 'common.homepage' })}</p>
          </Button>

          {isLoggedIn && (
            <Button
              variant="ghost"
              onClick={() => router.push('/me/my-ticket')}
              className="flex justify-start items-center gap-2 text-base px-4"
            >
              <TicketIcon size={20} />
              <p className="font-medium text-foreground">{formatMessage({ id: 'navBar.mobile.myTickets' })}</p>
            </Button>
          )}

          {isLoggedIn && (
            <Button
              variant="ghost"
              onClick={() => router.push('/organizer')}
              className="flex justify-start items-center gap-2 text-base px-4"
            >
              <ArrowLeftRightIcon size={20} />
              <p className="font-medium text-foreground">{formatMessage({ id: 'navBar.mobile.organizer' })}</p>
            </Button>
          )}

          <Separator className="bg-neutral-200 mt-2 mb-1 px-4" />
        </div>

        <p className="text-xl font-semibold text-foreground px-4">{formatMessage({ id: 'settings.title' })}</p>
        <div className="flex items-center justify-between px-4">
          <p className="text-foreground">English</p>
          <LocaleSwitch showLabel={false} />
        </div>
        <div className="flex flex-col items-start gap-4 w-full px-4">
          <p className="text-foreground">{formatMessage({ id: 'settings.darkMode' })}</p>
          <DarkModeSwitch />
        </div>
      </SheetContent>
    </Sheet>
  );
}
