import classnames from 'classnames';
import { IconProps } from './type';

export function Timer({ className, height = 18, width = 18 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      className={classnames('stroke-neutral-500', className)}
    >
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.563 9.938A6.565 6.565 0 0 1 9 16.5a6.565 6.565 0 0 1-6.563-6.563A6.565 6.565 0 0 1 9 3.375a6.565 6.565 0 0 1 6.563 6.563ZM9 6v3.75" />
        <path d="M6.75 1.5h4.5" strokeMiterlimit="10" />
      </g>
    </svg>
  );
}
