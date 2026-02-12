import { describe, expect, it } from 'vitest';
import { timeout } from './timeout';

describe('timeout', () => {
  it('should resolve if promise resolves before timeout', async () => {
    const promise = new Promise((resolve) => setTimeout(() => resolve('success'), 10));
    await expect(timeout(promise, 100)).resolves.toBe('success');
  });

  it('should reject if promise times out', async () => {
    const promise = new Promise((resolve) => setTimeout(() => resolve('success'), 100));
    await expect(timeout(promise, 10)).rejects.toThrow('Operation timed out after 10ms');
  });
});
