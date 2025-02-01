import { useTheme } from 'next-themes';


export function useIsDarkTheme(): boolean {
    const { theme, systemTheme } = useTheme();

    return theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
}
