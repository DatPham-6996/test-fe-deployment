import { subMilliseconds } from 'date-fns';

export function calculateReservationSessionTime(params: { expireAt?: Date; bufferTimeMs?: number }) {
  const { expireAt, bufferTimeMs } = params;
  if (!expireAt || !bufferTimeMs) {
    return 0;
  }

  const now = Date.now();
  const UIExpireAt = subMilliseconds(expireAt, bufferTimeMs).valueOf();

  const minutesRemaining = (UIExpireAt - now) / 60 / 1000;

  return Math.max(minutesRemaining, 0);
}
