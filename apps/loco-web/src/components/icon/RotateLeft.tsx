import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

export function RotateLeft({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={twMerge('stroke-neutral-500', className)}>
      <path
        d="M6.83256 3.81005C7.48506 3.61505 8.20506 3.48755 9.00006 3.48755C12.5926 3.48755 15.5026 6.39755 15.5026 9.99005C15.5026 13.5825 12.5926 16.4925 9.00006 16.4925C5.40756 16.4925 2.49756 13.5825 2.49756 9.99005C2.49756 8.65505 2.90256 7.41005 3.59256 6.37505"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.90234 3.99L8.06984 1.5" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.90234 3.98999L8.42984 5.83499" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
