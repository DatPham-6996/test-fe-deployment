import classnames from 'classnames';
import { IconProps } from './type';

export function CaretUp({ className }: IconProps) {
  return (
    <svg width="12" height="6" fill="none" className={classnames('stroke-neutral-500', className)}>
      <path
        d="m1.5 5.25 3.793-3.793c.333-.333.5-.5.707-.5.207 0 .374.167.707.5L10.5 5.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
