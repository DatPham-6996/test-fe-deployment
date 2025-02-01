import { datadogLogs } from '@datadog/browser-logs';
import { useStatsigClient, useStatsigUser } from '@statsig/react-bindings';
import axios from 'axios';
import { useCallback } from 'react';
import { FlipEvent, Maybe } from '../__generated__/graphql';
import { getPreviousPage } from '../utils/previous-page';

export function useLogEvent() {
  const { logEvent: statsigLogEvent, client: statsigClient } = useStatsigClient();
  const { user: statsigUser } = useStatsigUser();
  const logEvent = useCallback(
    (params: {
      eventName: string;
      value?: string | number;
      eventID?: string;
      artistID?: string;
      organizationID?: string;
      event?: Maybe<FlipEvent>;
      metadata?: Record<string, string> | null;
    }) => {
      const { eventName, value, eventID, artistID, organizationID, event, metadata } = params;
      const platform = 'web';
      const referrer = document.referrer || getPreviousPage();
      const page = window.location.href;
      const statsigUrl = process.env.NEXT_PUBLIC_STAT_URL;
      if (!statsigUrl) {
        return;
      }

      try {
        statsigLogEvent(eventName, value, {
          page,
          platform,
          referrer,
          eventID: eventID ?? event?.id ?? '',
          artistID: artistID ?? '',
          organizationID: event?.organization?.id ?? organizationID ?? '',
          ...metadata,
        });
      } catch (e) {
        datadogLogs.logger.error('[Flip] Failed statsigLogEvent', {}, e as Error);
      }

      try {
        const { stableID } = statsigClient.getContext();

        axios.post(`${statsigUrl}/tracking-events`, {
          events: [
            {
              page,
              // TODO: Fix stableID is null issue
              deviceId: stableID ?? '',
              eventName,
              platform,
              eventData: { value, referrer, ...metadata },
              userId: statsigUser.userID,
              eventTime: new Date().toISOString(),
            },
          ],
        });
      } catch (e) {
        datadogLogs.logger.error('[Flip] Failed tracking event', {}, e as Error);
      }
    },
    [statsigLogEvent, statsigClient, statsigUser.userID]
  );

  return { logEvent };
}
