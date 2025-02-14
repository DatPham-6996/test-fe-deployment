import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function OutlinedCheck({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={twMerge('stroke-neutral-500', className)}
    >
      <g>
        <path
          d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
