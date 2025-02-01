'use client';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
;

type ContentCenterProps = {
  children?: ReactNode | undefined;
  maxWidth?: 900 | 950 | 1000 | 1200 | 1600;
};

export function ContentCenterNarrow({ maxWidth, children }: ContentCenterProps) {
  let maxWidthClass = 'max-w-[900px]';
  switch (maxWidth) {
    case 950:
      maxWidthClass = 'max-w-[950px]';
      break;
    case 1000:
      maxWidthClass = 'max-w-[1000px]';
      break;
    case 1200:
      maxWidthClass = 'max-w-[1200px]';
      break;
    case 1600:
      maxWidthClass = 'max-w-[1600px]';
      break;
    default:
      maxWidthClass = 'max-w-[900px]';
      break;
  }

  return (
    <div className={cn('flex mx-auto w-full justify-center md:px-4 px-2', maxWidthClass)}>{children}</div>
  );
}
