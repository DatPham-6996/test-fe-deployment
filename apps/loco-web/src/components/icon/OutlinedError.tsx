import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function OutlinedError({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image
      className={twMerge('stroke-neutral-500', className)}
      width={size}
      height={size}
      src="/icons/error-circle-outline.svg"
      alt="error-circle-outline"
    />
  );
}
