import classnames from 'classnames';
import { IconProps } from './type';

export function CopyOutline({ className, onClick }: IconProps & { onClick: () => void }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      className={classnames('stroke-neutral-500', className)}
      onClick={onClick}
    >
      <g>
        <path
          d="M14.3086 4.5H6.50391C5.39718 4.5 4.5 5.39718 4.5 6.50391V14.3086C4.5 15.4153 5.39718 16.3125 6.50391 16.3125H14.3086C15.4153 16.3125 16.3125 15.4153 16.3125 14.3086V6.50391C16.3125 5.39718 15.4153 4.5 14.3086 4.5Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M13.4824 4.5L13.5 3.65625C13.4985 3.13456 13.2906 2.63466 12.9217 2.26577C12.5528 1.89688 12.0529 1.68898 11.5312 1.6875H3.9375C3.3413 1.68926 2.77003 1.92688 2.34846 2.34846C1.92688 2.77003 1.68926 3.3413 1.6875 3.9375V11.5312C1.68898 12.0529 1.89688 12.5528 2.26577 12.9217C2.63466 13.2906 3.13456 13.4985 3.65625 13.5H4.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
