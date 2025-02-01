'use client';

import { useLocale } from '@/locale/intl-provider-wrapper';
import { useIntl } from 'react-intl';
import { Label } from '../shadcn/ui/label';
import { Switch } from '../shadcn/ui/switch';

export function LocaleSwitch({ showLabel = true }: { showLabel?: boolean }) {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  const onClick = () => {
    if (locale === 'vi') {
      setLocale('en');
    } else {
      setLocale('vi');
    }
  };

  return (
    <div className="dark:text-neutral-100 text-neutral-600 flex justify-center items-center gap-2">
      {showLabel && <Label htmlFor="english-mode">English</Label>}
      <Switch id="english-mode" onClick={onClick} defaultChecked={locale === 'en'} />
    </div>
  );
}
