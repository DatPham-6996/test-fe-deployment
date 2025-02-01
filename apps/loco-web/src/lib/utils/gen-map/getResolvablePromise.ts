import emptyFunction from './emptyFunction';

export default function getResolvablePromise<T>(): [
  Promise<T>,
  (data: T) => void,
  (err: unknown) => void,
] {
  let resolver: (data: T) => void = emptyFunction;
  let rejecter: (e: unknown) => void = emptyFunction;
  const promise = new Promise<T>((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  return [promise, resolver, rejecter];
}
