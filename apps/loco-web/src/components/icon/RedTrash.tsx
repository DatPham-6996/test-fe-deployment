import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type VisaCardProps = IconProps & {
  size?: number;
};

export function RedTrash({ className, size = 25 }: VisaCardProps) {
  return <Image className={className} width={size} height={size} src="/icons/red-trash.svg" alt="red-trash" />;
}
