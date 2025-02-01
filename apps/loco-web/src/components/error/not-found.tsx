import { ContentCenter } from '@/containers/content-center/ContentCenter';
import { useIntl } from 'react-intl';
import { Calendar } from '../icon';
import { Button } from '../shadcn/ui/button';

export function NotFound() {
  const gotoHome = () => window.location.replace('/');
  const { formatMessage } = useIntl();
  return (
    <ContentCenter>
      <div className="flex flex-col justify-center items-center gap-5 mt-9">
        <Calendar size={100} />
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-xl font-bold">{formatMessage({ id: 'system.error404' })}</p>
        </div>
        <Button onClick={gotoHome} type="submit">
          {formatMessage({ id: 'system.error404Action' })}
        </Button>
      </div>
    </ContentCenter>
  );
}
