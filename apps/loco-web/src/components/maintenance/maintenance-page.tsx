import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { useIntl } from 'react-intl';
import { FlipLogo } from '../icon/FlipLogo';

export default function MaintenancePage() {
  const isDarkMode = useIsDarkTheme();
  const { formatMessage } = useIntl();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <FlipLogo width={300} height={300} className="mx-auto" />
        <h1 className="text-3xl font-bold mb-4">{formatMessage({ id: 'maintenance.title' })}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{formatMessage({ id: 'maintenance.description' })}</p>
      </div>
    </div>
  );
}
