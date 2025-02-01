import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function BadgeCheck({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image
      className={twMerge('self-start', className)}
      width={size}
      height={size}
      src="/icons/badge-check.svg"
      alt="badge-check"
    />
  );
}
