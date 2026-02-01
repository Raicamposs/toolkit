import { describe, expect, it } from 'vitest';
import { hasOnlyUnassignedProperties } from './has-only-unassigned-properties';

describe('hasOnlyUnassignedProperties', () => {
  it('should return true for null and undefined', () => {
    expect(hasOnlyUnassignedProperties(null)).toBe(true);
    expect(hasOnlyUnassignedProperties(undefined)).toBe(true);
  });

  it('should return true for an empty object', () => {
    expect(hasOnlyUnassignedProperties({})).toBe(true);
  });

  it('should return true for an object with all properties null or undefined', () => {
    const obj = { a: null, b: undefined };
    expect(hasOnlyUnassignedProperties(obj)).toBe(true);
  });

  it('should return false for an object with at least one assigned property', () => {
    const obj1 = { a: 1, b: null };
    expect(hasOnlyUnassignedProperties(obj1)).toBe(false);

    const obj2 = { a: 'hello' };
    expect(hasOnlyUnassignedProperties(obj2)).toBe(false);
  });

  it('should return false for assigned primitive values', () => {
    expect(hasOnlyUnassignedProperties(0)).toBe(false);
    expect(hasOnlyUnassignedProperties('')).toBe(false);
    expect(hasOnlyUnassignedProperties(false)).toBe(false);
    expect(hasOnlyUnassignedProperties(1)).toBe(false);
    expect(hasOnlyUnassignedProperties('text')).toBe(false);
    expect(hasOnlyUnassignedProperties(true)).toBe(false);
  });

  it('should return true for an empty array', () => {
    expect(hasOnlyUnassignedProperties([])).toBe(true);
  });

  it('should return false for an array with assigned values', () => {
    expect(hasOnlyUnassignedProperties([1, 2, 3])).toBe(false);
  });

  it('should return true for an array with only null or undefined values', () => {
    expect(hasOnlyUnassignedProperties([null, undefined])).toBe(true);
  });
});
