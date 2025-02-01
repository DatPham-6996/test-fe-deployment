import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

export function CaretRight({ className }: IconProps) {
  return (
    <svg width="8" height="14" fill="none" className={twMerge('stroke-neutral-500', className)}>
      <path
        d="m1 13 5.293-5.293c.333-.333.5-.5.5-.707 0-.207-.167-.374-.5-.707L1 1"
        stroke="#737373"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
