'use client';

import { Button } from '@/components/shadcn/ui/button';
import Image from 'next/image';
import { useIntl } from 'react-intl';

export default function OrgOnboard() {
  const { formatMessage } = useIntl();
  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-6">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col justify-center gap-2">
          <p className="text-4xl font-semibold">{formatMessage({ id: 'organizer.homepage.welcome2' })}</p>
          <p className="text-xl">{formatMessage({ id: 'organizer.homepage.welcome1' })}</p>
        </div>

        <div className="flex flex-col md:flex-row justify-start items-center gap-4">
          <Button
            onClick={() => {
              window.open('https://tally.so/r/mD5KBR', '_blank', 'noopener,noreferrer');
            }}
            className="w-[200px]"
          >
            {formatMessage({ id: 'organizer.homepage.createOrg' })}
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <a href="/whyus">
            {formatMessage({ id: 'organizer.homepage.reason' })} {'>'}
          </a>
          <a href="https://cal.com/flip-vn/30min">
            {formatMessage({ id: 'organizer.homepage.question' })} {'>'}
          </a>
        </div>
      </div>

      <div className="flex">
        <Image
          src={'https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/organizer/Group+48229.webp'}
          alt="onboard"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
