'use client';

import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import EventFeedContainer from '@/containers/event-timeline/EventFeedContainer';
import { FlipLayout } from '@/containers/flip-layout';
import { useIntl } from 'react-intl';

export default function DemoPage() {
  const intl = useIntl();

  return (
    <FlipLayout>
      <ContentCenterNarrow>
        <div className="flex flex-col w-full">
          <div className="flex justify-between my-9">
            <p className="text-2xl font-bold">{intl.formatMessage({ id: 'demo.title' })}</p>
          </div>
          <EventFeedContainer isDemo={true} />
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
