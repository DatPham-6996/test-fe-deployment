'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { isDesktop } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { Button } from '../shadcn/ui/button';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const intl = useIntl();
  const isDarkMode = useIsDarkTheme();

  return (
    <div className="dark:text-neutral-100 text-neutral-600">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'}>
            <Sun className={cn(isDarkMode ? 'hidden' : '')} size={isDesktop ? 16 : 20} />
            <Moon className={cn(isDarkMode ? '' : 'hidden')} size={isDesktop ? 16 : 20} />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            {intl.formatMessage({ id: 'mode.light' })}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            {intl.formatMessage({ id: 'mode.dark' })}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            {intl.formatMessage({ id: 'mode.system' })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
