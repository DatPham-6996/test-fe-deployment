'use client';

import Loader from '@/components/loading-indicator/Loader';
import { FlipLayout } from '@/containers/flip-layout';
import { useEventDetailsQuery } from '@/lib/__generated__/graphql';
import { useParams, useRouter } from 'next/navigation';
import WaitingRoomContainer from '../container/WaitingRoomContainer';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { useRecoilState } from 'recoil';
import { queueTokenState } from '@/state-management/waiting-room/atoms/queue-token-state';

export default function WaitingRoomPage() {
  const { handle } = useParams();
  const { data: eventDetails } = useEventDetailsQuery({
    variables: { handle: handle as string },
    fetchPolicy: 'cache-and-network',
  });
  const [queueToken, setQueueToken] = useRecoilState(queueTokenState(eventDetails?.event.id ?? ''));

  const router = useRouter();

  const getCoverPhoto = () => {
    if (!eventDetails) return '';

    if (
      eventDetails.event.mediaCollection &&
      eventDetails.event.mediaCollection.cover &&
      eventDetails.event.media &&
      eventDetails.event.media.length
    ) {
      return eventDetails.event.media.find((item) => eventDetails.event.mediaCollection.cover === item.id)?.url ?? '';
    }

    return '';
  };

  return (
    <FlipLayout hideFooter={true} className="min-h-screen w-full">
      <ContentCenterNarrow>
        {!eventDetails && <Loader />}
        {eventDetails && (
          <WaitingRoomContainer
            //TODO: use real event id
            // eventId={eventDetails?.event.id}
            eventId={'Sample'}
            thumbnail={getCoverPhoto()}
            onAccept={(accessToken, expiresIn, refreshToken) => {
              setQueueToken({
                accessToken,
                expiresIn,
                refreshToken,
              });
              router.push(`/reservation/${handle}`);
            }}
            onDecline={() => {
              router.push(`/events/${handle}`);
            }}
          />
        )}
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
