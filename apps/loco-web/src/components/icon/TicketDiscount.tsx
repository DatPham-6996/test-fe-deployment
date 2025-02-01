import { IconProps } from './type';
import { twMerge } from 'tailwind-merge';

export const TicketDiscount = ({ className }: IconProps) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={twMerge('stroke-neutral-500', className)}>
      <path
        d="M14.625 9.375C14.625 8.34 15.465 7.5 16.5 7.5V6.75C16.5 3.75 15.75 3 12.75 3H5.25C2.25 3 1.5 3.75 1.5 6.75V7.125C2.535 7.125 3.375 7.965 3.375 9C3.375 10.035 2.535 10.875 1.5 10.875V11.25C1.5 14.25 2.25 15 5.25 15H12.75C15.75 15 16.5 14.25 16.5 11.25C15.465 11.25 14.625 10.41 14.625 9.375Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.75 11.0625L11.25 6.5625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.2459 11.0625H11.2526" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.74588 6.9375H6.75262" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
