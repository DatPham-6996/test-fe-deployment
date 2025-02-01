import classnames from 'classnames';
import { IconProps } from './type';

export function CircleArrow({ className }: IconProps) {
  return (
    <svg width="18" height="18" fill="none" className={classnames('fill-neutral-500', className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 17.25A8.25 8.25 0 1 1 9 .75a8.25 8.25 0 0 1 0 16.5Zm0-1.5a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Zm-2.47-3.22 3.97-3.97v2.69H12V6H6.75v1.5h2.69l-3.97 3.97 1.06 1.06Z"
      />
    </svg>
  );
}
