import classnames from 'classnames';
import { IconProps } from './type';

const DEFAULT_SIZE = 18;

export function Close({ className, width = DEFAULT_SIZE, height = DEFAULT_SIZE }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={classnames('fill-neutral-500', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
      />
    </svg>
  );
}
