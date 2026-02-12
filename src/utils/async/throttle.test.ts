import { describe, expect, it, vi } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  it('should throttle function calls', () => {
    vi.useFakeTimers();
    const func = vi.fn();
    const throttledFunc = throttle(func, 100);

    throttledFunc();
    throttledFunc();
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttledFunc();

    expect(func).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
