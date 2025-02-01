import { Card, CardBody, CardHeader } from '@/components/card';
import { Button } from '@/components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Markdown from 'react-markdown';

type Props = { policy?: string | undefined | null; }

export default function RefundPolicy({ policy }: Props) {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader title={formatMessage({ id: 'payment.refundPolicy' })} withSeparator={true} />
        <CardBody>
          <div className="flex flex-col gap-4">
            {!policy ? (<p className="text-sm text-muted-foreground">
              {formatMessage({ id: 'payment.refundPolicyDes' })}
            </p>) : <p className="text-sm">
              {formatMessage({ id: 'payment.readPolicy' })}
            </p>}
            {policy && (

              <Button
                variant={"secondary"}
                size="sm"
                className="text-sm"
                onClick={() => setOpen(true)}
              >
                {formatMessage({ id: 'common.details' })}
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{formatMessage({ id: 'payment.refundPolicy' })}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert prose-headings:font-semibold prose-h1:text-xl prose-h2:text-lg prose-p:text-sm max-h-[80vh] overflow-y-auto max-w-full">
            <Markdown>{policy || ''}</Markdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
