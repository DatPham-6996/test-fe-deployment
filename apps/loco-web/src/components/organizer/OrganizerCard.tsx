'use client';

import { Card, CardBody, CardHeader } from '@/components/card';
import { Separator } from '@/components/shadcn/ui/separator';
import { ChevronRight, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import { useIntl } from 'react-intl';

type Props = {
  organizationLogoURL: string;
  organizationName: string;
  organizationContactEmail?: string;
  organizationHandle?: string;
};
export default function OrganizerCard({
  organizationLogoURL,
  organizationName,
  organizationContactEmail,
  organizationHandle,
}: Props) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <Card>
        <CardHeader title={formatMessage({ id: 'eventDetail.organizer' })} icon={<UsersIcon size={18} />} />

        <Separator orientation="horizontal" />

        <CardBody>
          <a href={`/organization/${organizationHandle}`}>
            <div className="flex flex-col gap-3">
              <div className="flex mt-3 items-center gap-2">
                {organizationLogoURL && (
                  <Image
                    height={20}
                    width={20}
                    className="w-8 h-8 rounded-full border-1 border-muted"
                    src={organizationLogoURL}
                    alt={organizationName ?? ''}
                  />
                )}
                <p className="text-base font-medium text-foreground">{organizationName}</p>
                <ChevronRight size={14} />
              </div>
            </div>
          </a>
        </CardBody>
      </Card>
    </div>
  );
}
