import { localStorageEffect } from '@/state-management/utils/localStorageEffect';
import { atom } from 'recoil';

const getDefaultLocale = () => {
  if (typeof window === 'undefined') {
    return 'vi';
  }

  const browserLocale = navigator.language || navigator.languages[0] || 'vi';
  const language = browserLocale.split('-')[0];
  return language === 'vi' ? 'vi' : 'en';
};

export const currentLocaleState = atom<string>({
  key: 'currentLocale',
  default: getDefaultLocale(),
  effects: [localStorageEffect('current_locale', 'string')],
});
