import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { IconProps } from './type';

type OutlinedCheckProps = IconProps & {
  size?: number;
  onClick: () => void;
};

export function UploadAvatar({ onClick, className, size = 20 }: OutlinedCheckProps) {
  return (
    <Image
      onClick={onClick}
      className={twMerge('self-start', className)}
      width={size}
      height={size}
      src="/icons/upload-avatar.svg"
      alt="upload-avatar"
    />
  );
}
