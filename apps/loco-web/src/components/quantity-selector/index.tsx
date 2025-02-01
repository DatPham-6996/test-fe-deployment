import { toastWarn } from '@/lib/utils/toast';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

type CounterProps = {
  onChange?: (value: number) => void;
  availableQuantity: number;
  maxQuantity?: number;
};

export const QuantitySelector = ({ onChange, availableQuantity, maxQuantity = 10 }: CounterProps) => {
  const [counter, setCounter] = useState(1);
  const { formatMessage } = useIntl();

  const isQuantityLimitExceeded = counter >= availableQuantity;

  const handleIncrease = () => {
    if (isQuantityLimitExceeded) {
      toastWarn(formatMessage({ id: 'eventDetail.ticketAvailableExceeded' }));
      return;
    }

    if (counter < maxQuantity) {
      setCounter(counter + 1);
      onChange && onChange(counter + 1);
    } else {
      toastWarn(formatMessage({ id: 'eventDetail.ticketMaxQuantity' }));
    }
  };

  const handleDecrease = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      onChange && onChange(counter - 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        onClick={handleDecrease}
        className="flex hover:cursor-pointer h-8 w-8 items-center justify-center rounded-md border-2 dark:border-white"
      >
        <MinusIcon size={16} className="fill-white-950" />
      </div>

      <div className="flex items-center w-8 justify-center font-semibold">{counter}</div>

      <div
        onClick={handleIncrease}
        className="flex hover:cursor-pointer h-8 w-8 items-center justify-center rounded-md border-2  dark:border-white"
      >
        <PlusIcon size={16} />
      </div>
    </div>
  );
};
