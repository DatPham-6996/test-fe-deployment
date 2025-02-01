'use client';

import { Button } from '@/components/shadcn/ui/button';

import Loader from '@/components/loading-indicator/Loader';
import {
  postGenerateToken,
  getQueueNumber,
  postAssignQueueNumber,
  getServingNumber,
  QUEUE_POSITION_EXPIRED_ERROR,
  getQueuePositionExpiry,
} from '@/lib/api/waiting-room';
import { stringToLuxonVN } from '@/lib/utils/time-format';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toastError } from '@/lib/utils/toast';
import { QueuePositionExpiresAlert } from '@/components/alert/QueuePositionExpiresAlert';
import { useIntl } from 'react-intl';
import { Progress } from '@/components/shadcn/ui/progress';
import { Loader2, LoaderCircleIcon } from 'lucide-react';

export type WaitingRoomContainerProps = {
  eventId: string;
  thumbnail: string;
  onAccept: (accessToken: string, expiresIn: number, refreshToken: string) => void;
  onDecline: () => void;
};

export const UserStatus = {
  INITIALIZING: 'initializing',
  LOBBY: 'lobby',
  ENQUEUED: 'enqueued',
  CUSTOMER_TURN: 'customer_turn',
  //   COMPLETED: 'completed',
  TOKEN_REQUEST_PERIOD_EXPIRED: 'token_request_period_expired',
};

export default function WaitingRoomContainer({ eventId, thumbnail, onAccept, onDecline }: WaitingRoomContainerProps) {
  const [userStatus, setUserStatus] = useState<string>(UserStatus.INITIALIZING);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [servingNumber, setServingNumber] = useState<number | null>(null);
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  //   const [waitingNumber, setWaitingNumber] = useState<number | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>(new Date());
  const [queueProgress, setQueueProgress] = useState<number>(0);
  const currentDate = useRef<Date>(new Date());
  const [queuePositionExpiry, setQueuePositionExpiry] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isGeneratingToken, setIsGeneratingToken] = useState<boolean>(false);

  const { formatMessage } = useIntl();

  const assignQueueNumber = useCallback(async () => {
    const data = await postAssignQueueNumber(eventId);
    return data.api_request_id;
  }, [eventId]);

  const syncRequestId = useCallback(async () => {
    const currentRequestId = requestId ?? (await assignQueueNumber());
    setRequestId(currentRequestId);
    return currentRequestId;
  }, [requestId]);

  const getGeneratedToken = useCallback(
    async (requestId: string) => {
      if (!requestId) {
        throw new Error('getGeneratedToken: request ID is required');
      }
      try {
        return await postGenerateToken(eventId, requestId);
      } catch (error) {
        if (error === QUEUE_POSITION_EXPIRED_ERROR) {
          setUserStatus(UserStatus.TOKEN_REQUEST_PERIOD_EXPIRED);
        }
        throw error;
      }
    },
    [eventId]
  );

  const bypassQueueIfTokenIsAvailable = useCallback(async (requestId: string) => {
    const result = await getGeneratedToken(requestId);
    if (result) {
      onAccept(result.access_token, result.expires_in, result.refresh_token);
    }
  }, []);

  const syncQueuePositionExpiry = useCallback(
    async (requestId: string) => {
      console.log('syncQueuePositionExpiry.requestId:', requestId);
      if (!requestId) {
        throw new Error('syncQueuePositionExpiry: request ID is required');
      }
      try {
        const data = await getQueuePositionExpiry(eventId, requestId);
        setQueuePositionExpiry(data.expires_in);
        return data.expires_in;
      } catch (error) {
        if (error === QUEUE_POSITION_EXPIRED_ERROR) {
          await bypassQueueIfTokenIsAvailable(requestId);
        }
        throw error;
      }
    },
    [eventId, requestId]
  );

  const syncQueueNumber = useCallback(
    async (requestId: string) => {
      if (!requestId) {
        throw new Error('syncQueueNumber: request ID is required');
      }
      if (queueNumber) {
        return queueNumber;
      }
      const data = await getQueueNumber(eventId, requestId);
      const result = data.queue_number;
      setQueueNumber(result);
      return result;
    },
    [eventId, queueNumber]
  );

  const syncServingNumber = useCallback(async () => {
    const data = await getServingNumber(eventId);
    const servingNumber = data.serving_counter;
    setServingNumber(servingNumber);
    return servingNumber;
  }, [eventId]);

  //   const syncWaitingNumber = async () => {
  //     const data = await getWaitingNumber(eventId);
  //     const waitingNumber = data.waiting_num;
  //     setWaitingNumber(waitingNumber);
  //     return waitingNumber;
  //   };

  const refreshUserStatus = useCallback(async () => {
    setIsRefreshing(true);

    try {
      const currentRequestId = await syncRequestId();
      const queueNumber = await syncQueueNumber(currentRequestId);
      const servingNumber = await syncServingNumber();
      const customerHasTurn = servingNumber >= queueNumber;
      if (customerHasTurn) {
        await syncQueuePositionExpiry(currentRequestId);
      }

      if (!queueNumber) {
        setUserStatus(UserStatus.LOBBY);
      } else if (queueNumber > servingNumber) {
        setUserStatus(UserStatus.ENQUEUED);
      } else if (queueNumber <= servingNumber) {
        setUserStatus(UserStatus.CUSTOMER_TURN);
      }
    } catch (error) {
      console.log('refreshUserStatus.error:', error);
    } finally {
      setIsRefreshing(false);
      setLastUpdatedAt(new Date());
    }
  }, []);

  useEffect(() => {
    if (userStatus === UserStatus.INITIALIZING) {
      if (!isRefreshing) {
        refreshUserStatus();
      }
    }
  }, [isRefreshing, , userStatus]);

  useEffect(() => {
    if (userStatus === UserStatus.ENQUEUED) {
      if (servingNumber && queueNumber) {
        setQueueProgress(servingNumber / queueNumber);
      }
    }
  }, [servingNumber, queueNumber, userStatus]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (userStatus === UserStatus.ENQUEUED || userStatus === UserStatus.CUSTOMER_TURN) {
        await refreshUserStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userStatus]);

  useEffect(() => {
    if (queuePositionExpiry) {
      setRemainingTime(queuePositionExpiry);
    }
  }, [queuePositionExpiry]);

  useEffect(() => {
    if (!remainingTime) {
      return;
    }
    const timer = setInterval(() => {
      if (remainingTime && remainingTime > 0) {
        setRemainingTime((prevTime) => (prevTime !== null ? prevTime - 1 : null));
      } else if (remainingTime && remainingTime <= 0) {
        setUserStatus(UserStatus.TOKEN_REQUEST_PERIOD_EXPIRED);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const initializingCard = () => {
    return <Loader className="my-10" />;
  };

  const lobbyCard = () => {
    return <p>Lobby</p>;
  };

  const EnqueueStatusCard = (props: { title: string; value: string }) => {
    return (
      <div className="flex flex-col items-start bg-gray-50 border rounded-lg p-4 gap-1">
        <p className="font-normal text-xs text-muted-foreground text-start">{props.title}</p>
        {props.value && <p className="text-2xl font-medium text-foreground text-start">{props.value}</p>}
      </div>
    );
  };

  const enqueuedCard = () => {
    const progress = Math.min(95, Math.max(10, queueProgress * 100));
    const estimatedWaitingTime = queueNumber && servingNumber ? (queueNumber - servingNumber) * 10 : '...';
    const peopleBefore = servingNumber && queueNumber ? queueNumber - servingNumber : '...';
    const lastUpdatedAtString = lastUpdatedAt
      ? stringToLuxonVN(lastUpdatedAt.toISOString()).toFormat('HH:mm:ss')
      : '...';
    return (
      <div className="flex flex-col items-center">
        <p className="text-lg sm:text-xl font-semibold">{formatMessage({ id: 'waitingRoom.inQueue' })}</p>
        <p className="text-sm sm:text-base text-center font-regular mb-10">
          {formatMessage({ id: 'waitingRoom.queueDescription' })}
        </p>
        <div className="w-full mb-6">
          <Progress value={progress} className="bg-gray-200 [&>div]:bg-green-500 h-6 w-full rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full text-center text-sm gap-2">
          <EnqueueStatusCard
            title={formatMessage({ id: 'waitingRoom.estimatedAccessTime' })}
            value={
              queueNumber && servingNumber
                ? stringToLuxonVN(currentDate.current.toISOString())
                    .plus({ minutes: (queueNumber - servingNumber) * 10 })
                    .toFormat('HH:mm:ss')
                : '...'
            }
          />
          <EnqueueStatusCard
            title={formatMessage({ id: 'waitingRoom.estimatedWaitingTime' })}
            value={`${estimatedWaitingTime} ${formatMessage({ id: 'waitingRoom.minutes' })}`}
          />
          <EnqueueStatusCard
            title={formatMessage({ id: 'waitingRoom.queuePosition' })}
            value={peopleBefore.toString()}
          />
          <EnqueueStatusCard title={formatMessage({ id: 'waitingRoom.lastUpdated' })} value={lastUpdatedAtString} />
        </div>
        {updateNotice()}
      </div>
    );
  };

  const customerTurnCard = () => {
    return (
      <div className="flex flex-col items-center">
        <p className="text-lg sm:text-xl font-semibold mb-1 mt-4">{formatMessage({ id: 'waitingRoom.yourTurn' })}</p>
        <p className="text-sm sm:text-base text-center font-regular">
          {formatMessage({ id: 'waitingRoom.yourTurnDescription' })}
        </p>
        <div className="flex flex-row gap-3 mt-6 mb-10">
          <Button
            size="lg"
            variant="outline"
            onClick={async () => {
              onDecline();
            }}
          >
            {formatMessage({ id: 'waitingRoom.backButton' })}
          </Button>
          <Button
            size="lg"
            loading={isGeneratingToken}
            onClick={async () => {
              try {
                setIsGeneratingToken(true);
                if (!requestId) {
                  throw new Error('customerTurnCard: request ID is required');
                }
                const token = await getGeneratedToken(requestId);
                onAccept(token.access_token, token.expires_in, token.refresh_token);
              } catch (error: any) {
                toastError(error.toString());
              } finally {
                setIsGeneratingToken(false);
              }
            }}
          >
            {formatMessage({ id: 'waitingRoom.bookButton' })}
            {remainingTime ? ` (${remainingTime})` : ''}
          </Button>
        </div>
      </div>
    );
  };

  const updateNotice = () => {
    return (
      <div className="flex flex-row items-center gap-2 mt-10">
        <p className="text-sm font-normal text-muted-foreground">{formatMessage({ id: 'waitingRoom.updateNotice' })}</p>
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 mt-6">
      <QueuePositionExpiresAlert open={userStatus === UserStatus.TOKEN_REQUEST_PERIOD_EXPIRED} onClick={onDecline} />
      <img src={thumbnail} alt="Event Thumbnail" className="w-full object-cover rounded-lg mb-4" />
      {userStatus === UserStatus.INITIALIZING && initializingCard()}
      {userStatus === UserStatus.LOBBY && lobbyCard()}
      {userStatus === UserStatus.ENQUEUED && enqueuedCard()}
      {userStatus === UserStatus.CUSTOMER_TURN && customerTurnCard()}
    </div>
  );
}
