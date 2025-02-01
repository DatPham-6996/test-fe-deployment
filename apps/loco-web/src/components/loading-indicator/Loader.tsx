'use client';

import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { PulseLoader } from 'react-spinners';
export default function Loader({ className, size }: { className?: string; size?: number }) {
  const isDarkMode = useIsDarkTheme();
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <PulseLoader size={size} color={isDarkMode ? 'white' : 'black'} />
    </div>
  );
}
