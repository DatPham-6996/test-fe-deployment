import { useState } from 'react';
import { PriceItem, TicketPriceItem } from './PriceItem';

type TicketPriceItemsProps = {
  options: TicketPriceItem[];
  onSelect: (value: TicketPriceItem) => void;
  selectedValue: string;
};

export function TicketPriceItems({ options, onSelect, selectedValue }: TicketPriceItemsProps) {
  const onClick = (value: TicketPriceItem) => {
    onSelect(value);
  };

  return (
    <div className="flex flex-col mt-2 gap-2">
      {options.map((option) => {
        return <PriceItem key={option.value} {...option} onClick={onClick} active={option.value === selectedValue} />;
      })}
    </div>
  );
}
