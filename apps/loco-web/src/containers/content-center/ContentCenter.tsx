'use client';
import { LayoutProps } from '../flip-layout';

type ContentCenterProps = LayoutProps;

export function ContentCenter(props: ContentCenterProps) {
  return (
    <div className="flex" {...props}>
      <div className="flex mx-auto w-full justify-center items-center md:px-4 px-2">{props.children}</div>
    </div>
  );
}
