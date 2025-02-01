'use client';
import { datadogLogs } from '@datadog/browser-logs';
import '@datadog/browser-logs/bundle/datadog-logs';
import { datadogRum } from "@datadog/browser-rum";
interface DataDogProviderProps {
  children: React.ReactNode;
}

let isDatadogInitialized = false;

export default function DatadogWrapper({ children }: DataDogProviderProps) {
  const site = 'us5.datadoghq.com';
  const service = 'flip-web-client';
  const env = process.env.NEXT_PUBLIC_ENV || 'development';

  if (!isDatadogInitialized && process.env.NEXT_PUBLIC_ENV === 'production') {
    datadogLogs.init({
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
      site: site,
      service: service,
      env: env,
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
    });

    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || '',
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
      site: site,
      service: service,
      env: env,
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      // Specify URLs to propagate trace headers for connection between RUM and backend trace
      allowedTracingUrls: [
        { match: process.env.NEXT_PUBLIC_SCHEMA_PATH || '', propagatorTypes: ["tracecontext"] },
        { match: process.env.NEXT_PUBLIC_TICKETING_PATH || '', propagatorTypes: ["tracecontext"] },
      ],
    });

    isDatadogInitialized = true;
  }

  return <>{children}</>;
}
