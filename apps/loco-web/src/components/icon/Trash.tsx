import classnames from 'classnames';
import { IconProps } from './type';

export function Trash({ className }: IconProps) {
  return (
    <svg width="18" height="18" fill="none" className={classnames('stroke-neutral-500', className)}>
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.25 4.5h13.5M14.25 4.5V15c0 .75-.75 1.5-1.5 1.5h-7.5c-.75 0-1.5-.75-1.5-1.5V4.5M6 4.5V3c0-.75.75-1.5 1.5-1.5h3c.75 0 1.5.75 1.5 1.5v1.5M7.5 8.25v4.5M10.5 8.25v4.5" />
      </g>
    </svg>
  );
}
