import classnames from 'classnames';
import { IconProps } from './type';

type InfoProps = IconProps & {
  size?: number;
};
const SIZE = 24;

export function Info({ className, size = SIZE }: InfoProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      className={classnames('fill-neutral-500', className)}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2Zm-.75 6c0-.41.34-.75.75-.75s.75.34.75.75v5c0 .41-.34.75-.75.75s-.75-.34-.75-.75V8Zm1.67 8.38c-.05.13-.12.23-.21.33-.1.09-.21.16-.33.21-.12.05-.25.08-.38.08s-.26-.03-.38-.08-.23-.12-.33-.21c-.09-.1-.16-.2-.21-.33A.995.995 0 0 1 11 16c0-.13.03-.26.08-.38s.12-.23.21-.33c.1-.09.21-.16.33-.21a1 1 0 0 1 .76 0c.12.05.23.12.33.21.09.1.16.21.21.33.05.12.08.25.08.38s-.03.26-.08.38Z"
        fill="#0A0A0A"
        className="fill-inherit"
      />
    </svg>
  );
}
