'use client';

import { Button } from '@/components/shadcn/ui/button';
import { Card } from '@/components/shadcn/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/shadcn/ui/hover-card';
import { InfoIcon } from 'lucide-react';
import { ReactElement } from 'react';

export function SummaryCard({
  icon,
  title,
  value,
  action,
  infoTip,
}: {
  icon?: ReactElement;
  title: string;
  value: string;
  action?: ReactElement;
  infoTip?: string;
}) {
  return (
    <Card className="flex flex-col gap-2 flex-grow p-6 dark:bg-muted">
      <div className="text-sm font-medium flex justify-between">
        <div className="flex items-center">
          <p>{title}</p>
          {infoTip && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">
                  <InfoIcon size={16} />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex justify-between space-x-4">
                  <p>{infoTip}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>
      <div className="text-2xl font-medium">{value}</div>
      {action}
    </Card>
  );
}
