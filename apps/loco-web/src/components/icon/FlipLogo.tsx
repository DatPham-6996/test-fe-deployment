import { cn } from '@/lib/utils';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import Image from 'next/image';

interface FlipLogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export function FlipLogo({ width = 52, height = 52, className }: FlipLogoProps) {
    const isDarkMode = useIsDarkTheme();

    return (
        <Image
            src={isDarkMode ? '/icons/flip-dark.png' : '/icons/flip-light.png'}
            alt="flip logo"
            width={width}
            height={height}
            priority
            className={cn(className)}
        />
    );
}
