import { useIntl } from 'react-intl';
import { gql } from '@apollo/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';
import TransactionHistoryContainer from './TransactionHistoryContainer';
import PayoutHistoryContainer from './PayoutHistoryContainer';
import { useState } from 'react';

enum PayoutTabBarItem {
  TRANSACTION = 'transaction',
  PAYOUT = 'payout',
}

export function PayoutTabBarContainer({ className }: { className?: string }) {
  const [tab, setTab] = useState<PayoutTabBarItem>(PayoutTabBarItem.TRANSACTION);
  const { formatMessage } = useIntl();

  return (
    <Tabs
      className={className}
      defaultValue={tab}
      value={tab}
      onValueChange={(value) => setTab(value as PayoutTabBarItem)}
    >
      <TabsList className="grid w-full max-w-[400px] grid-cols-2 h-11">
        <TabsTrigger className="h-9" value={PayoutTabBarItem.TRANSACTION}>
          {formatMessage({ id: 'payout.transaction' })}
        </TabsTrigger>
        <TabsTrigger className="h-9" value={PayoutTabBarItem.PAYOUT}>
          {formatMessage({ id: 'payout.payoutRequests' })}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={PayoutTabBarItem.TRANSACTION}>
        <TransactionHistoryContainer />
      </TabsContent>
      <TabsContent value={PayoutTabBarItem.PAYOUT}>
        <PayoutHistoryContainer />
      </TabsContent>
    </Tabs>
  );
}
