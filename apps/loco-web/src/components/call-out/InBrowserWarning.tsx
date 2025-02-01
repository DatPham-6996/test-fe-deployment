import { toastSuccess } from '@/lib/utils/toast';
import { useIntl } from 'react-intl';
import { Button } from '../shadcn/ui/button';

export function InBrowserWarning({ title, message }: { title: string; message: string }) {
  const intl = useIntl();
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      <p className="text-lg font-medium">{title}</p>
      <p>{message}</p>
      <div className="flex-col justify-center items-center w-full">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toastSuccess(intl.formatMessage({ id: 'operation.copiedLink' }));
          }}
        >
          {intl.formatMessage({ id: 'operation.copy' })}
        </Button>
      </div>
    </div>
  );
}
