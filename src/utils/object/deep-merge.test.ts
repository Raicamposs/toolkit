import { describe, expect, it } from 'vitest';
import { deepMerge } from './deep-merge';

describe('deepMerge', () => {
  it('should merge two simple objects', () => {
    const target = { a: 1 };
    const source = { b: 2 };
    expect(deepMerge(target, source)).toEqual({ a: 1, b: 2 });
  });

  it('should deeply merge nested objects', () => {
    const target = { a: { x: 1 } };
    const source = { a: { y: 2 } };
    expect(deepMerge(target, source)).toEqual({ a: { x: 1, y: 2 } });
  });

  it('should overwrite primitive values', () => {
    const target = { a: 1 };
    const source = { a: 2 };
    expect(deepMerge(target, source)).toEqual({ a: 2 });
  });

  it('should handle arrays as values (replace, not merge)', () => {
    const target = { a: [1, 2] };
    const source = { a: [3, 4] };
    expect(deepMerge(target, source)).toEqual({ a: [3, 4] });
  });
});
