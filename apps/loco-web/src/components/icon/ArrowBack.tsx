import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

export function ArrowBack({ className }: IconProps) {
  return (
    <svg width="22" height="14" fill="none" viewBox="0 0 22 14" className={twMerge('stroke-neutral-500', className)}>
      <g id="Arrow">
        <path d="M2.8331 7L20.3331 6.99972" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7.49978 1.1665L2.37355 6.29273C2.04022 6.62606 1.87355 6.79273 1.87355 6.99984C1.87355 7.20694 2.04022 7.37361 2.37355 7.70694L7.49978 12.8332"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
