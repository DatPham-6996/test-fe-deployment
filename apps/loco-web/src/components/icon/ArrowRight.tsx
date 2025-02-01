import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

export function ArrowRight({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={twMerge('stroke-neutral-500', className)}>
      <path d="M19 12L4 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15 7L19.2929 11.2929C19.6262 11.6262 19.7929 11.7929 19.7929 12C19.7929 12.2071 19.6262 12.3738 19.2929 12.7071L15 17"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
