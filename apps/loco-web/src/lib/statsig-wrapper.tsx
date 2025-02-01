'use client';

import { useAuth } from '@/state-management/hooks/useAuth';
import { LogLevel } from '@statsig/js-client';
import { StatsigProvider } from '@statsig/react-bindings';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function StatsigWrapper({ children }: Props) {
  const { currentUser: firebaseUser } = useAuth();
  const { email, uid } = firebaseUser ?? {};
  // const options: StatsigOptions = {
  //   networkConfig: {
  //     logEventUrl: '/proxy/log_event',
  //     initializeUrl: '/proxy/initialize',
  //   },
  //   disableStatsigEncoding: true,
  //   disableCompression: true,
  // };

  // const { client } = useClientAsyncInit(process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!, {
  //   email: email || undefined,
  //   userID: uid,
  // }, {
  //   logLevel: LogLevel.Debug,
  // });

  // Update to using useClientBootstrapInit instead of useClientAsyncInit
  // const client = useClientBootstrapInit(
  //   bootstrapValues.key,
  //   firebaseUser ? { ...bootstrapValues.user, email: email || undefined, userID: uid } : bootstrapValues.user,
  //   bootstrapValues.data,
  //   { logLevel: LogLevel.Debug } // Optional - Prints debug logs to the console
  // );


  // useEffect(() => {
  //   runStatsigSessionReplay(client);
  //   runStatsigAutoCapture(client);
  // }, [client]);

  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || ''}
      user={{
        email: email || undefined,
        userID: uid,
      }}
      options={{
        environment: { tier: process.env.NODE_ENV },
        logLevel: LogLevel.Debug,
        plugins: [new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin()],
      }}
    >
      {children}
    </StatsigProvider>
  );
}
