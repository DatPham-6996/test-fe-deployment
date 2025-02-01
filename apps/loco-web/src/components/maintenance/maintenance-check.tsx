'use client';

import { useDynamicConfig } from '@statsig/react-bindings';
import MaintenancePage from './maintenance-page';

interface MaintenanceCheckProps {
  children: React.ReactNode;
}

export default function MaintenanceCheck({ children }: MaintenanceCheckProps) {
  const env = process.env.NEXT_PUBLIC_ENV || 'development';
  const configKey = env === 'production' ? 'prod_enabled' : 'dev_enabled';
  const maintenanceModeConfig = useDynamicConfig('maintenance_mode');
  const isMaintenanceMode = maintenanceModeConfig.get(configKey, false);

  // Allow access to specific paths even during maintenance
  const allowedPaths: string[] = []; // Add any paths that should be accessible
  const isAllowedPath =
    typeof window !== 'undefined' && allowedPaths.some((path) => window.location.pathname.startsWith(path));

  if (isMaintenanceMode && !isAllowedPath) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}
