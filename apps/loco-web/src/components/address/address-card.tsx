import { Card, CardBody, CardHeader } from '@/components/card';
import { CopyOutline } from '@/components/icon';
import { FlipAddress, FlipVenue } from '@/lib/__generated__/graphql';
import { toastSuccess } from '@/lib/utils/toast';
import { MapPinIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

type Props = {
  venue: FlipVenue;
  address: FlipAddress;
};

export default function AddressCard({ venue, address }: Props) {
  const { formatMessage } = useIntl();

  return (
    <Card>
      <CardHeader title={formatMessage({ id: 'eventDetail.location' })} icon={<MapPinIcon size={18} />} />
      <CardBody className="px-0">
        <div>
          <iframe
            className="w-full h-56"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMAP_KEY}&q=${venue?.name || ''}+' '+${address?.address}&language=vi`}
          />
        </div>
        <div className="px-5 mt-2">
          <div className="flex justify-between items-center">
            <p className="font-medium">{address?.city}</p>
            <CopyOutline
              className="hover:cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(address?.address ?? '');
                toastSuccess(formatMessage({ id: 'operation.copiedAddress' }));
              }}
            />
          </div>
          <p className="text-muted-foreground mt-1">{address?.address}</p>
        </div>
      </CardBody>
    </Card>
  );
}
