import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

export function Email({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={twMerge('stroke-neutral-500', className)}>
      <g>
        <g>
          <path
            d="M14.166 17.0837H5.83268C3.33268 17.0837 1.66602 15.8337 1.66602 12.917V7.08366C1.66602 4.16699 3.33268 2.91699 5.83268 2.91699H14.166C16.666 2.91699 18.3327 4.16699 18.3327 7.08366V12.917C18.3327 15.8337 16.666 17.0837 14.166 17.0837Z"
            stroke="#737373"
            strokeWidth="1.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1673 7.5L11.559 9.58333C10.7006 10.2667 9.29231 10.2667 8.43398 9.58333L5.83398 7.5"
            stroke="#737373"
            strokeWidth="1.25"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
