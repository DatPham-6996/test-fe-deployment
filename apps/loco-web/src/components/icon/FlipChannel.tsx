import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
};

export function FlipChannel({ className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image className={twMerge(className)} width={size} height={size} src="/icons/flip-channel.svg" alt="flip-channel" />
  );
}
