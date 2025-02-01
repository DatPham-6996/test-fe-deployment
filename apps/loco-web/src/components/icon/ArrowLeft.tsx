import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={twMerge('stroke-neutral-500', className)}>
      <path d="M5 12L20 11.9998" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 7L4.70711 11.2929C4.37377 11.6262 4.20711 11.7929 4.20711 12C4.20711 12.2071 4.37377 12.3738 4.70711 12.7071L9 17"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
