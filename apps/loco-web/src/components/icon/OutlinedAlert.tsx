import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function OutlinedAlert({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image
      className={twMerge('stroke-neutral-500', className)}
      width={size}
      height={size}
      src="/icons/alert-circle-outline.svg"
      alt="alert-circle-outline"
    />
  );
}
