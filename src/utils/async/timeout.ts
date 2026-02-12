/**
 * Returns a promise that rejects if the input promise does not resolve within the specified timeout.
 *
 * @param promise - The promise to wait for
 * @param ms - The timeout in milliseconds
 * @returns A promise that resolves with the input promise's value or rejects with a timeout error
 */
export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([
    promise.then((result) => {
      clearTimeout(timer);
      return result;
    }),
    timeoutPromise,
  ]);
}
