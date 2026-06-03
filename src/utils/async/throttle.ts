/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle executions to
 * @returns A new throttled function
 */
export function throttle<TArgs extends unknown[], TReturn>(
  func: (this: unknown, ...args: TArgs) => TReturn,
  wait: number,
): (...args: TArgs) => void {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;

  return function (this: unknown, ...args: TArgs) {
    if (!inThrottle) {
      func.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            func.apply(this, args);
            lastTime = Date.now();
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0),
      );
    }
  };
}
