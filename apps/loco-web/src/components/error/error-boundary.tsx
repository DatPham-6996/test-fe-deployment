'use client';
import { isInAppBrowser } from '@/lib/utils/client-utils';
import { useAuth } from '@/state-management/hooks/useAuth';
import { datadogLogs } from '@datadog/browser-logs';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { InternalServer } from './internal-server';
import { NotFound } from './not-found';
import { parseError } from './utils';

type FallbackProps = {
  error: any;
};

function Fallback({ error }: FallbackProps) {
  const { currentUser } = useAuth();

  // Log error to Datadog
  datadogLogs.logger.error('[Web] React Error Boundary', {
    user: currentUser ? currentUser.email : 'anonymous',
    error: error.message,
    stack: error.stack,
    isFacebookWebview: isInAppBrowser(),
  });

  const { status } = parseError(error);
  if (status === 404) {
    return <NotFound />;
  }

  return <InternalServer />;
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ReactErrorBoundary FallbackComponent={Fallback}>{children}</ReactErrorBoundary>;
}
