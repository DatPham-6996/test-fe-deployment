import classnames from 'classnames';
import { IconProps } from './type';

type LocationProps = IconProps & {
  size?: number;
};

export function Location({ className, size = 24 }: LocationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={classnames('stroke-neutral-500', className)}
    >
      <path
        clipRule="evenodd"
        d="M14.5 10.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M12 21c-1.199 0-7.5-5.102-7.5-10.437C4.5 6.387 7.857 3 12 3c4.142 0 7.5 3.387 7.5 7.563C19.5 15.898 13.198 21 12 21Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
