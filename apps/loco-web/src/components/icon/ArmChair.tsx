import classnames from 'classnames';
import { IconProps } from './type';

export function ArmChair({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={classnames('stroke-neutral-500', className)}>
      <path
        d="M14.25 6.75V4.5C14.25 4.10218 14.092 3.72064 13.8107 3.43934C13.5294 3.15804 13.1478 3 12.75 3H5.25C4.85218 3 4.47064 3.15804 4.18934 3.43934C3.90804 3.72064 3.75 4.10218 3.75 4.5V6.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 8.25V12C2.25 12.3978 2.40804 12.7794 2.68934 13.0607C2.97064 13.342 3.35218 13.5 3.75 13.5H14.25C14.6478 13.5 15.0294 13.342 15.3107 13.0607C15.592 12.7794 15.75 12.3978 15.75 12V8.25C15.75 7.85218 15.592 7.47064 15.3107 7.18934C15.0294 6.90804 14.6478 6.75 14.25 6.75C13.8522 6.75 13.4706 6.90804 13.1893 7.18934C12.908 7.47064 12.75 7.85218 12.75 8.25V9.75H5.25V8.25C5.25 7.85218 5.09196 7.47064 4.81066 7.18934C4.52936 6.90804 4.14782 6.75 3.75 6.75C3.35218 6.75 2.97064 6.90804 2.68934 7.18934C2.40804 7.47064 2.25 7.85218 2.25 8.25Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.75 13.5V15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.25 13.5V15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
