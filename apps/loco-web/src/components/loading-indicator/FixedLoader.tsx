import { SPINNER_DARK_COLOR, SPINNER_LIGHT_COLOR } from '@/lib/utils/constants';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { ClipLoader } from 'react-spinners';

export default function FixedLoader({ size }: { size?: number }) {
  const isDarkMode = useIsDarkTheme();

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 w-screen h-screen">
      <ClipLoader size={size} color={isDarkMode ? SPINNER_LIGHT_COLOR : SPINNER_DARK_COLOR} />
    </div>
  );
}
