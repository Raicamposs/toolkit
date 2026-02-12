import { describe, expect, it } from 'vitest';
import { unique } from './unique';

describe('unique', () => {
  it('should remove duplicate numbers', () => {
    expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
  });

  it('should remove duplicate strings', () => {
    expect(unique(['a', 'b', 'b', 'c', 'a'])).toEqual(['a', 'b', 'c']);
  });

  it('should handle empty arrays', () => {
    expect(unique([])).toEqual([]);
  });

  it('should remove duplicate object references', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    expect(unique([obj1, obj2, obj1])).toEqual([obj1, obj2]);
  });
});
