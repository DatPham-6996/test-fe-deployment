import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function Gender({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image
      className={twMerge('stroke-neutral-500 self-start', className)}
      width={size}
      height={size}
      src="/icons/gender.svg"
      alt="gender"
    />
  );
}
