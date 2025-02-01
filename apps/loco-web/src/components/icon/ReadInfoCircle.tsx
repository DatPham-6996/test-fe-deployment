import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function RedInfoCircle({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image
      className={twMerge('self-start', className)}
      width={size}
      height={size}
      src="/icons/red-info-circle.svg"
      alt="red-info-circle"
    />
  );
}
