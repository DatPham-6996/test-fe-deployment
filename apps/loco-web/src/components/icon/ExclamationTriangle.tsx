import classnames from 'classnames';
import { IconProps } from './type';

export function ExclamationTriangle({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={classnames('stroke-neutral-500', className)}>
      <path
        d="M8 5.99998V8.66665M8 11.3333H8.00667M14.4867 12L9.15337 2.66665C9.03708 2.46146 8.86844 2.29078 8.66465 2.17203C8.46087 2.05329 8.22923 1.99072 7.99337 1.99072C7.75751 1.99072 7.52587 2.05329 7.32209 2.17203C7.1183 2.29078 6.94966 2.46146 6.83337 2.66665L1.50004 12C1.38249 12.2036 1.32085 12.4346 1.32137 12.6697C1.32189 12.9047 1.38455 13.1355 1.503 13.3385C1.62144 13.5416 1.79147 13.7097 1.99583 13.8259C2.2002 13.942 2.43164 14.0021 2.6667 14H13.3334C13.5673 13.9997 13.7971 13.938 13.9996 13.8208C14.2021 13.7037 14.3702 13.5354 14.487 13.3327C14.6039 13.1301 14.6654 12.9002 14.6653 12.6663C14.6653 12.4324 14.6037 12.2026 14.4867 12Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
