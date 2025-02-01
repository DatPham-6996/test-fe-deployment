import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

export const logFacebookWebviewIssue = () => {
  if (typeof window === 'undefined') return;

  const browserInfo = {
    userAgent: navigator.userAgent,
    windowSize: {
      inner: { width: window.innerWidth, height: window.innerHeight },
      outer: { width: window.outerWidth, height: window.outerHeight },
    },
    documentState: document.readyState,
    scriptsLoaded: document.scripts.length,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  };

  // Log to Datadog
  datadogLogs.logger.info('Facebook WebView Debug Info', { browserInfo });

  // Add a custom RUM event
  datadogRum.addAction('facebook_webview_load', {
    ...browserInfo,
  });
};
