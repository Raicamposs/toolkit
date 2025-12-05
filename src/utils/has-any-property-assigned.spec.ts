import { describe, expect, it } from 'vitest'
import { hasAnyPropertyAssigned } from './has-any-property-assigned'

describe('hasAnyPropertyAssigned', () => {
  it('should return true for null and undefined', () => {
    expect(hasAnyPropertyAssigned(null)).toBe(true)
    expect(hasAnyPropertyAssigned(undefined)).toBe(true)
  })

  it('should return true for an empty object', () => {
    expect(hasAnyPropertyAssigned({})).toBe(true)
  })

  it('should return true for an object with all properties null or undefined', () => {
    const obj = { a: null, b: undefined }
    expect(hasAnyPropertyAssigned(obj)).toBe(true)
  })

  it('should return false for an object with at least one assigned property', () => {
    const obj1 = { a: 1, b: null }
    expect(hasAnyPropertyAssigned(obj1)).toBe(false)

    const obj2 = { a: 'hello' }
    expect(hasAnyPropertyAssigned(obj2)).toBe(false)
  })

  it('should return false for assigned primitive values', () => {
    expect(hasAnyPropertyAssigned(0)).toBe(false)
    expect(hasAnyPropertyAssigned('')).toBe(false)
    expect(hasAnyPropertyAssigned(false)).toBe(false)
    expect(hasAnyPropertyAssigned(1)).toBe(false)
    expect(hasAnyPropertyAssigned('text')).toBe(false)
    expect(hasAnyPropertyAssigned(true)).toBe(false)
  })

  it('should return true for an empty array', () => {
    expect(hasAnyPropertyAssigned([])).toBe(true);
  });

  it('should return false for an array with assigned values', () => {
    expect(hasAnyPropertyAssigned([1, 2, 3])).toBe(false);
  });

  it('should return true for an array with only null or undefined values', () => {
    expect(hasAnyPropertyAssigned([null, undefined])).toBe(true);
  });
});
