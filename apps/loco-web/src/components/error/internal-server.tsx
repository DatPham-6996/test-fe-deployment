import { ContentCenter } from '@/containers/content-center/ContentCenter';
import { useIntl } from 'react-intl';
import { InfoOutline } from '../icon';
import { Button } from '../shadcn/ui/button';

export function InternalServer() {
  const gotoHome = () => window.location.reload();
  const { formatMessage } = useIntl();
  return (
    <ContentCenter>
      <div className="flex flex-col justify-center items-center gap-5  mt-9">
        <InfoOutline size={100} />
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="font-bold text-lg">{formatMessage({ id: 'system.error' })}</p>
          <p className="text-md">{formatMessage({ id: 'system.errorAction' })}</p>
        </div>
        <Button onClick={gotoHome} type="submit">
          {formatMessage({ id: 'system.retry' })}
        </Button>
      </div>
    </ContentCenter>
  );
}
