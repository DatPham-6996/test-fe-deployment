import { twMerge } from 'tailwind-merge';
import { IconProps } from './type';

type CalendarProps = IconProps & {
  size?: number;
};
const SIZE = 20;

export function Calendar({ className, size = SIZE }: CalendarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={twMerge('stroke-neutral-500', className)}
    >
      <g id="vuesax/linear/calendar">
        <g id="calendar">
          <path
            d="M6.6665 1.66675V4.16675"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3335 1.66675V4.16675"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.9165 7.57495H17.0832"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 7.08341V14.1667C17.5 16.6667 16.25 18.3334 13.3333 18.3334H6.66667C3.75 18.3334 2.5 16.6667 2.5 14.1667V7.08341C2.5 4.58341 3.75 2.91675 6.66667 2.91675H13.3333C16.25 2.91675 17.5 4.58341 17.5 7.08341Z"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13.0791 11.4167H13.0866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.0791 13.9167H13.0866" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.99607 11.4167H10.0036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M9.99607 13.9167H10.0036"
            stroke="#0C0507"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6.91209 11.4167H6.91957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.91209 13.9167H6.91957" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}
