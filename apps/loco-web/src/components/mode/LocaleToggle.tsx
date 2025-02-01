'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/ui/dropdown-menu';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { Globe } from 'lucide-react';
import { useEffect } from 'react';
import { isDesktop } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { Button } from '../shadcn/ui/button';

export function LocaleToggle() {
  const intl = useIntl();
  const { setLocale } = useLocale();

  return (
    <div className="dark:text-neutral-100 text-neutral-600">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'}>
            <Globe size={isDesktop ? 16 : 20} />
            {/* Uncomment if you want to display the current locale text */}
            {/* <p className="text-sm text-muted-foreground">
              {locale === 'vi'
                ? intl.formatMessage({ id: 'mode.vietnamese' })
                : intl.formatMessage({ id: 'mode.english' })}
            </p> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLocale('vi')}>
            <span className="text-xl mr-1">🇻🇳</span> {intl.formatMessage({ id: 'mode.vietnamese' })}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLocale('en')}>
            <span className="text-xl mr-1">🇬🇧</span> {intl.formatMessage({ id: 'mode.english' })}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
