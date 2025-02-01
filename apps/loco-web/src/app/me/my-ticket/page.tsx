'use client';

import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import EventTicketTimelineContainer from '@/containers/event-timeline/EventTicketTimelineContainer';
import { FlipLayout } from '@/containers/flip-layout';
import { useAuth } from '@/state-management/hooks/useAuth';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

export default function MyTicketPage() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { isLoggedIn, openLoginModal } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
      openLoginModal();
    }
  }, [isLoggedIn, router, openLoginModal]);

  return (
    <FlipLayout>
      <ContentCenterNarrow>
        <div className="flex flex-col w-full">
          <div className="flex justify-between my-9">
            <p className="text-2xl font-bold">{formatMessage({ id: 'me.tickets.myTickets' })}</p>
          </div>

          <EventTicketTimelineContainer isOnClickToEvent={false} showEventStatus={false} />
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
