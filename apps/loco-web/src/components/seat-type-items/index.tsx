import { formatPrice } from '@/lib/utils/format';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Markdown from 'react-markdown';

type TicketTierItemProps = {
  value: string;
  name: string;
  description?: string | null | undefined;
  price: string;
  backgroundColor: string;
  borderColor: string;
};

type TicketTierInfoListProps = {
  items: TicketTierItemProps[];
};

export function TicketTierInfoList({ items }: TicketTierInfoListProps) {
  const { formatMessage } = useIntl();

  return (
    <div className="flex flex-col gap-1 divide-y">
      {items.map((props: TicketTierItemProps) => (
        <TicketTierItem {...props} key={props.value} />
      ))}
    </div>
  );
}


export function TicketTierItem({ name, description, price, backgroundColor, borderColor }: TicketTierItemProps) {
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const onClick = () => setIsOpenDescription(!isOpenDescription);
  return (
    <div
      onClick={onClick}
      className={classNames('flex flex-col p-5 hover:bg-muted', {
        'cursor-pointer': description,
      })}
    >
      <div className="flex items-center">
        <div className="grow flex flex-row items-center gap-2">
          <div
            className={`rounded-full w-3 h-3 border-2`}
            style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
          />
          <p className="font-medium text-lg" style={{ color: borderColor }}>
            {name.toUpperCase()}
          </p>
        </div>
        <p className="text-foreground font-medium text-lg">{formatPrice(price)}</p>
      </div>
      {isOpenDescription && description && (
        <div className="mt-2 px-2 text-sm">
          <Markdown>{description}</Markdown>
        </div>
      )
      }
    </div >
  );
}
