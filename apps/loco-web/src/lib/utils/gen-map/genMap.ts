import getResolvablePromise from './getResolvablePromise';

export async function genMap<T, U>(
  items: readonly T[],
  callbackFn: (item: T, index: number) => Promise<U>,
  concurrency = 10,
): Promise<U[]> {
  if (concurrency <= 0) {
    throw new Error('Invalid concurrency setting.');
  }

  if (items.length <= concurrency) {
    return await Promise.all(items.map(callbackFn));
  }

  const promises = Array<Promise<U>>(items.length);
  let active = 0;
  let [underLimitPromise, resolveUnderLimit] = getResolvablePromise<void>();

  let isRejected = false;

  for (let i = 0; i < items.length; ++i) {
    if (active >= concurrency) {
      [underLimitPromise, resolveUnderLimit] = getResolvablePromise<void>();
      // eslint-disable-next-line no-await-in-loop
      await underLimitPromise;
    }
    if (isRejected) {
      // As soon as one rejects, just await all and it will reject
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(promises);
    }
    const k = i; // make immutable for the callback

    ++active;
    promises[k] = callbackFn(items[k], k).then(
      (v) => {
        --active;
        resolveUnderLimit();
        return v;
      },
      (e) => {
        --active;
        isRejected = true;
        resolveUnderLimit();
        throw e;
      },
    );
  }

  return await Promise.all(promises);
}
