import { useIntl } from 'react-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { queueTokenState } from '@/state-management/waiting-room/atoms/queue-token-state';
import { QueuePositionExpiresAlert } from '../alert/QueuePositionExpiresAlert';
import { useRouter } from 'next/navigation';
import { Timers } from '.';
import { cn } from '@/lib/utils';
import { UserStatus } from '@/app/waiting-room/container/WaitingRoomContainer';
import { postAssignQueueNumber, postGenerateToken, QUEUE_POSITION_EXPIRED_ERROR } from '@/lib/api/waiting-room';

export type QueueTokenTimerProps = {
  eventId: string;
  hasWaitingRoom: boolean;
  handle: string;
  className?: string;
};

export function QueueTokenTimer({ eventId, hasWaitingRoom, handle, className }: QueueTokenTimerProps) {
  const { formatMessage } = useIntl();
  const [queueToken, setQueueToken] = useRecoilState(queueTokenState(eventId));
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [tokenExpired, setTokenExpired] = useState(false);
  const router = useRouter();
  const [requestId, setRequestId] = useState<string | null>(null);

  //TODO: use real event id
  const queueEventId = 'Sample';

  const getGeneratedToken = useCallback(async (requestId: string) => {
    if (!requestId) {
      throw new Error('getGeneratedToken: request ID is required');
    }
    try {
      return await postGenerateToken(queueEventId, requestId);
    } catch (error) {
      setTokenExpired(true);
    }
  }, []);

  const assignQueueNumber = useCallback(async () => {
    const data = await postAssignQueueNumber(queueEventId);
    return data.api_request_id;
  }, []);

  const syncRequestId = useCallback(async () => {
    const currentRequestId = requestId ?? (await assignQueueNumber());
    if (requestId !== currentRequestId) {
      setRequestId(currentRequestId);
    }
    return currentRequestId;
  }, [requestId]);

  const syncQueueTokenData = useCallback(async () => {
    try {
      const requestId = await syncRequestId();
      const token = await getGeneratedToken(requestId);
      setQueueToken({
        accessToken: token.access_token,
        expiresIn: token.expires_in,
        refreshToken: token.refresh_token,
      });
      // Initialize the countdown with the expiresIn value
      setTimeLeft(token.expires_in / 60);
    } catch (error) {
      console.log(error);
      if (error === QUEUE_POSITION_EXPIRED_ERROR) {
        setTokenExpired(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!hasWaitingRoom) {
      return;
    }

    if (!queueToken) {
      syncQueueTokenData();
      return;
    }
  }, [hasWaitingRoom, queueToken]);

  const shouldHideTimer = useMemo(() => {
    return !hasWaitingRoom || !timeLeft || timeLeft <= 0;
  }, [hasWaitingRoom, timeLeft]);

  return (
    <div className={cn('flex flex-row items-center justify-center gap-3 bg-white border px-3 py-3', className)}>
      <QueuePositionExpiresAlert
        open={tokenExpired}
        onClick={() => {
          setQueueToken(null);
          router.push(`/events/${handle}`);
        }}
      />
      {!shouldHideTimer && (
        <>
          <span className="text-foreground text-base">{formatMessage({ id: 'waitingRoom.accessTokenExpiresIn' })}</span>
          <Timers minutes={timeLeft ?? 0} callback={() => setTokenExpired(true)} />
        </>
      )}
    </div>
  );
}
