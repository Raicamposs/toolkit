import { describe, expect, it } from 'vitest'
import { hasSomePropertyAssigned } from './has-some-property-assigned'

describe('hasSomePropertyAssigned', () => {
  it('should return false for null and undefined', () => {
    expect(hasSomePropertyAssigned(null)).toBe(false)
    expect(hasSomePropertyAssigned(undefined)).toBe(false)
  })

  it('should return false for an empty object', () => {
    expect(hasSomePropertyAssigned({})).toBe(false)
  })

  it('should return false for an object with all properties null or undefined', () => {
    const obj = { a: null, b: undefined }
    expect(hasSomePropertyAssigned(obj)).toBe(false)
  })

  it('should return true for an object with at least one assigned property', () => {
    const obj1 = { a: 1, b: null }
    expect(hasSomePropertyAssigned(obj1)).toBe(true)

    const obj2 = { a: 'hello' }
    expect(hasSomePropertyAssigned(obj2)).toBe(true)
  })

  it('should return true for an object with all properties assigned', () => {
    const obj = { a: 1, b: 'world' }
    expect(hasSomePropertyAssigned(obj)).toBe(true)
  })

  it('should return true for assigned primitive values', () => {
    expect(hasSomePropertyAssigned(0)).toBe(true)
    expect(hasSomePropertyAssigned('')).toBe(true)
    expect(hasSomePropertyAssigned(false)).toBe(true)
    expect(hasSomePropertyAssigned(1)).toBe(true)
    expect(hasSomePropertyAssigned('text')).toBe(true)
    expect(hasSomePropertyAssigned(true)).toBe(true)
  })

  it('should return false for an empty array', () => {
    expect(hasSomePropertyAssigned([])).toBe(false);
  });

  it('should return true for an array with assigned values', () => {
    expect(hasSomePropertyAssigned([1, 2, 3])).toBe(true);
  });

  it('should return false for an array with only null or undefined values', () => {
    expect(hasSomePropertyAssigned([null, undefined])).toBe(false);
  });

  it('should return true for an array with mixed assigned and null/undefined values', () => {
    expect(hasSomePropertyAssigned([1, null, 2, undefined])).toBe(true);
  });
});
