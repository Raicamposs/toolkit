import { describe, expect, it } from 'vitest';
import { isObject } from './is-object';

describe('isObject', () => {
  it('should return true for plain objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
  });

  it('should return false for arrays', () => {
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2])).toBe(false);
  });

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isObject(undefined)).toBe(false);
  });

  it('should return false for primitives', () => {
    expect(isObject('string')).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
  });

  it('should return false for functions', () => {
    expect(isObject(() => { })).toBe(false);
  });

  it('should return true for object instances (e.g. Date, RegExp)', () => {
    // Note: The current implementation returns true for Date and RegExp as they are objects and not arrays.
    // Use isPlainObject if strict POJO check is needed.
    // Based on the existing deep-merge logic, this behavior is expected.
    expect(isObject(new Date())).toBe(true);
    expect(isObject(/test/)).toBe(true);
  });
});
