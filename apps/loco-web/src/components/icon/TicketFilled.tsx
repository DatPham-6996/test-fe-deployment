import classnames from 'classnames';
import { IconProps } from './type';

type TicketProps = IconProps & {
  width?: number;
  height?: number;
  color?: string;
};

export type TicketColor = 'pink' | 'blue' | 'yellow' | 'red';

export function TicketFilled({ className, width = 24, height = 24, color }: TicketProps) {
  const getFill = () => {
    switch (color) {
      case 'pink':
        return '#CF5E9E';
      case 'blue':
        return '#367EB3';
      case 'yellow':
        return '#F1BC40';
      case 'red':
        return '#DD4B56';
      default:
        return 'none';
    }
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={getFill()}
      className={classnames('fill-neutral-500', className)}
    >
      <path d="M22 10.75C22.41 10.75 22.75 10.41 22.75 10V9C22.75 4.59 21.41 3.25 17 3.25H10.75V5.5C10.75 5.91 10.41 6.25 10 6.25C9.59 6.25 9.25 5.91 9.25 5.5V3.25H7C2.59 3.25 1.25 4.59 1.25 9V9.5C1.25 9.91 1.59 10.25 2 10.25C2.96 10.25 3.75 11.04 3.75 12C3.75 12.96 2.96 13.75 2 13.75C1.59 13.75 1.25 14.09 1.25 14.5V15C1.25 19.41 2.59 20.75 7 20.75H9.25V18.5C9.25 18.09 9.59 17.75 10 17.75C10.41 17.75 10.75 18.09 10.75 18.5V20.75H17C21.41 20.75 22.75 19.41 22.75 15C22.75 14.59 22.41 14.25 22 14.25C21.04 14.25 20.25 13.46 20.25 12.5C20.25 11.54 21.04 10.75 22 10.75ZM10.75 14.17C10.75 14.58 10.41 14.92 10 14.92C9.59 14.92 9.25 14.58 9.25 14.17V9.83C9.25 9.42 9.59 9.08 10 9.08C10.41 9.08 10.75 9.42 10.75 9.83V14.17Z" />
    </svg>
  );
}
