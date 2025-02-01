import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type MasterCardProps = IconProps & {
  size?: number;
};

export function MasterCard({ className, size = 25 }: MasterCardProps) {
  return <Image className={className} width={size} height={size} src="/icons/master-card.svg" alt="master-card" />;
}
