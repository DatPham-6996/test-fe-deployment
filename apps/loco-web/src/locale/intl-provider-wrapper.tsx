'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';

// react-intl only accepts flat messages, so we need to flatten the messages
import { flattenMessages } from './flattenMessages';
import { useRecoilState } from 'recoil';
import { currentLocaleState } from '@/state-management/locale/current-locale';

// This load is for server rendering
const localeViMessages = flattenMessages(require('./messages/vi.json'));
const localeEnMessages = flattenMessages(require('./messages/en.json'));

type IntlProviderWrapperProps = {
  children: React.ReactNode;
};

export const LOCALE_VI = 'vi';
export const LOCALE_EN = 'en';
export const DEFAULT_LOCALE = LOCALE_VI;

type LocaleContextType = {
  locale: string;
  availableLocales: string[];
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  setLocale: () => {},
  availableLocales: [],
  locale: DEFAULT_LOCALE,
});

export const AVAILABLE_LOCALES = [LOCALE_VI, LOCALE_EN];

export const useLocale = () => useContext(LocaleContext);

export const IntlProviderWrapper = ({ children }: IntlProviderWrapperProps) => {
  const [locale, setLocale] = useRecoilState(currentLocaleState);
  const [messages, setMessages] = useState(() => (locale === LOCALE_EN ? localeEnMessages : localeViMessages));

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await import(`./messages/${locale}.json`);
        setMessages(flattenMessages(messages.default));
      } catch (error) {
        console.error('Failed to load locale data', error);
      }
    };

    loadMessages();
  }, [locale]);

  const contextValue = useMemo(
    () => ({
      locale,
      setLocale,
      availableLocales: AVAILABLE_LOCALES,
    }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider locale={locale} defaultLocale={DEFAULT_LOCALE} messages={messages}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};
