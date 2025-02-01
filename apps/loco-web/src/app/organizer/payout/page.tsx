'use client';

import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useRecoilState } from 'recoil';
import { PayoutTabBarContainer } from './containers/PayoutTabBarContainer';
import { PayoutSummaryContainer } from './containers/PayoutSummaryContainer';
import PayoutReportExportButton from './containers/PayoutReportExportContainer';
import { isMobile } from 'react-device-detect';

export default function PayoutsPage() {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const [currentEvent] = useRecoilState(currentEventState);

  useEffect(() => {
    if (!currentEvent) {
      router.replace('/organizer');
    }
  }, [currentEvent, router]);

  return (
    <div className="container px-5 md:px-20 mb-20">
      <div className="flex flex-row justify-between items-center flex-wrap">
        <h1 className="font-semibold text-[34px] my-5 text-center md:text-start">
          {formatMessage({ id: 'payout.title' })}
        </h1>
        <div className={`${isMobile ? 'w-full flex justify-end mb-2' : ''}`}>
          <PayoutReportExportButton />
        </div>
      </div>
      <PayoutSummaryContainer />
      <PayoutTabBarContainer className="mt-8" />
    </div>
  );
}
