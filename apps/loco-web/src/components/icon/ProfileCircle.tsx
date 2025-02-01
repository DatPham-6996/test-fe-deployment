import classnames from 'classnames';
import { IconProps } from './type';

export function ProfileCircle({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={classnames('stroke-stone-500', className)}>
      <g>
        <g>
          <path
            d="M10.1009 10.6507C10.0426 10.6424 9.96758 10.6424 9.90091 10.6507C8.43424 10.6007 7.26758 9.40072 7.26758 7.92572C7.26758 6.41738 8.48424 5.19238 10.0009 5.19238C11.5092 5.19238 12.7342 6.41738 12.7342 7.92572C12.7259 9.40072 11.5676 10.6007 10.1009 10.6507Z"
            stroke="#737373"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6161 16.1498C14.1328 17.5081 12.1661 18.3331 9.99948 18.3331C7.83281 18.3331 5.86615 17.5081 4.38281 16.1498C4.46615 15.3665 4.96615 14.5998 5.85781 13.9998C8.14115 12.4831 11.8745 12.4831 14.1411 13.9998C15.0328 14.5998 15.5328 15.3665 15.6161 16.1498Z"
            stroke="#737373"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99935 18.3337C14.6017 18.3337 18.3327 14.6027 18.3327 10.0003C18.3327 5.39795 14.6017 1.66699 9.99935 1.66699C5.39698 1.66699 1.66602 5.39795 1.66602 10.0003C1.66602 14.6027 5.39698 18.3337 9.99935 18.3337Z"
            stroke="#737373"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
