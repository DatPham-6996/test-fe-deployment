// app/statsig-demo/StatsigHelpers.ts

import Statsig, { DynamicConfig, LogEventObject, StatsigUser } from 'statsig-node';

const isStatsigReady = Statsig.initialize(process.env.STATSIG_SERVER_KEY!, {
  environment: { tier: process.env.NODE_ENV },
});

export async function getStatsigValues(user: StatsigUser): Promise<{
  data: string;
  user: StatsigUser;
  key: string;
}> {
  await isStatsigReady;
  const key = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!;

  const values = Statsig.getClientInitializeResponse(user, key, {
    // !!! IMPORTANT - the @statsig/js-client requires djb2 hashed config names, and by default this method won't generate those
    hash: 'djb2',
  });

  return {
    data: JSON.stringify(values),
    user,
    key,
  };
}

export async function logEvents(events: LogEventObject[]): Promise<void> {
  await isStatsigReady;

  events.forEach((event) => Statsig.logEventObject(event));
}

let customDomainConfigs: DynamicConfig | null = null;
export const getCustomDomainConfigs = async () => {
  if (!customDomainConfigs) {
    await isStatsigReady;
    customDomainConfigs = Statsig.getConfigSync({ userID: '' }, 'custom_domain_configs');
  }

  return customDomainConfigs;
};
