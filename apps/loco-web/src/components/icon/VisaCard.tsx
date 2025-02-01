import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type VisaCardProps = IconProps & {
  size?: number;
};

export function VisaCard({ className, size = 25 }: VisaCardProps) {
  return <Image className={className} width={size} height={size} src="/icons/visa-card.svg" alt="visa-card" />;
}
