'use client';

import { Card } from '@/components/card';
import { cn } from '@/lib/utils';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useIntl } from 'react-intl';
;

export default function EventRectangle({ eventTime, name, address, img }: any) {
  const { formatMessage } = useIntl();
  const onEventClick = () => { };
  return (
    <Card className={cn('cursor-pointer hover:shadow-lg dark:hover:border-white p-2')}>
      <div className="flex flex-col w-full ">
        <div
          className="flex flex-row gap-4 justify-between"
          onClick={() => {
            onEventClick();
          }}
        >
          {/* Left Image */}
          <div className="flex !w-[80px] !h-[80px] md:!w-[100px] md:!h-[100px]">
            <Image
              className="rounded-md object-cover  !aspect-square"
              layout="responsive"
              width={130}
              height={130}
              alt="a"
              src={img}
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col flex-1 gap-1.5 md:max-w-[400px] max-w-[calc(90%-90px)]">
            <p className="text-lg font-bold">{name}</p>

            <div className="flex gap-1 items-center">
              <p className="text-sm font-medium">{eventTime}</p>
            </div>

            {address && (
              <div className="flex gap-2 items-start">
                <MapPinIcon size={16} />
                <p className="truncate text-sm font-medium">
                  {address || formatMessage({ id: 'me.tickets.noLocation' })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
