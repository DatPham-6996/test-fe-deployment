import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import classNames from 'classnames';
import { PaymentMethod } from './type';

type PaymentItemProps = {
  icon: React.ReactNode;
  text: string;
  value: PaymentMethod;
  onClick: (value: PaymentMethod) => void;
  isSelected?: boolean;
};

export const PaymentItem = ({ icon, text, value, onClick, isSelected }: PaymentItemProps) => {
  const isDarkMode = useIsDarkTheme();
  return (
    <div
      className={classNames('flex flex-col border rounded-xl p-2 gap-2 hover:cursor-pointer', {
        'bg-neutral-100': !isDarkMode,
        'bg-white': isSelected && !isDarkMode,
        'border-neutral-950': isSelected && !isDarkMode,
        'bg-secondary': isDarkMode,
        'border-neutral-100': isDarkMode && isSelected,
      })}
      onClick={() => onClick(value)}
    >
      {icon}
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
};
