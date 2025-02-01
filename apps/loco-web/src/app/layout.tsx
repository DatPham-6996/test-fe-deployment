import { ErrorBoundary } from '@/components/error/error-boundary';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import { RecoilWrapper } from '@/lib/recoil-wrapper';

import { ResponsiveDialogProvider } from '@/components/responsive-dialog/responsive-dialog-context';
import DatadogWrapper from '@/lib/datadog-wrapper';
import IntercomWrapper from '@/lib/intercom-wrapper';
import { MedusaReactWrapper } from '@/lib/medusa-react-wrapper';
import ProgressBarProvider from '@/lib/progress-bar-wrapper';
import { ShadcnThemeProvider } from '@/lib/shadcn-theme-wrapper';
import StatsigWrapper from '@/lib/statsig-wrapper';
import ToastProvider from '@/lib/toast-wrapper';
import { cn } from '@/lib/utils';
import { IntlProviderWrapper } from '@/locale/intl-provider-wrapper';
import { AuthProvider } from '@/state-management/hooks/useAuth';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter as FontSans } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import '../styles/main.css';
import AppLoading from './loading';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // const bootstrapValues = await generateBootstrapValues();
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-3QE9XBLMPV';

  return (
    <html lang="en">
      <head>
        <Script async src="https://tally.so/widgets/embed.js"></Script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <Script type="text/javascript" src="https://js.xendit.co/v3/xendit.min.js"></Script>
        <meta name="facebook-domain-verification" content="nr6aubs8pdsx0iprovhs00i7zxl3ul" />
      </head>
      <body className={cn('bg-[#cce3f1] dark:bg-[#454728] bg-fixed', fontSans.variable)}>
        <div className="min-h-screen bg-light-gradient-to-b dark:bg-dark-gradient-to-b font-sans">
          <RecoilWrapper>
            <DatadogWrapper>
              <IntlProviderWrapper>
                <ErrorBoundary>
                  <ApolloWrapper>
                    <MedusaReactWrapper>
                      <ResponsiveDialogProvider>
                        <ShadcnThemeProvider attribute={'class'} disableTransitionOnChange>
                          <AuthProvider>
                            <StatsigWrapper>
                              <IntercomWrapper>
                                {/* <MaintenanceCheck> */}
                                <Suspense fallback={<AppLoading />}>
                                  <ProgressBarProvider>
                                    {children}
                                    <SpeedInsights />
                                    <ToastProvider />
                                    <GoogleAnalytics gaId={googleAnalyticsId} />
                                  </ProgressBarProvider>
                                </Suspense>
                              </IntercomWrapper>
                              {/* </MaintenanceCheck> */}
                            </StatsigWrapper>
                          </AuthProvider>
                        </ShadcnThemeProvider>
                      </ResponsiveDialogProvider>
                    </MedusaReactWrapper>
                  </ApolloWrapper>
                </ErrorBoundary>
              </IntlProviderWrapper>
            </DatadogWrapper>
          </RecoilWrapper>
        </div>
        <Script
          id="zalo-fix"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.zaloJSV2 = {
                zalo_h5_event_handler: function (eventId, eventName, eventData) {}
              };
            `,
          }}
        />
      </body>
    </html>
  );
}
