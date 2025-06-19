import { describe, expect, it } from 'vitest'
import { isNullOrUndefined } from './isNullOrUndefined'

describe('isNullOrUndefined', () => {
  it('should return true when value is undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true)
  })

  it('should return true when value is null', () => {
    expect(isNullOrUndefined(null)).toBe(true)
  })

  it('should return false for empty string', () => {
    expect(isNullOrUndefined('')).toBe(false)
  })

  it('should return false for zero', () => {
    expect(isNullOrUndefined(0)).toBe(false)
  })

  it('should return false for false boolean', () => {
    expect(isNullOrUndefined(false)).toBe(false)
  })

  it('should return false for object', () => {
    expect(isNullOrUndefined({})).toBe(false)
  })

  it('should return false for array', () => {
    expect(isNullOrUndefined([])).toBe(false)
  })

  it('should return false for NaN', () => {
    expect(isNullOrUndefined(NaN)).toBe(false)
  })
})
