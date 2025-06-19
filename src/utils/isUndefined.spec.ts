import { describe, expect, it } from 'vitest'
import { isUndefined } from './isUndefined'

describe('isUndefined', () => {
  it('should return true when value is undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should return false when value is null', () => {
    expect(isUndefined(null)).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(isUndefined('')).toBe(false)
  })

  it('should return false for zero', () => {
    expect(isUndefined(0)).toBe(false)
  })

  it('should return false for false boolean', () => {
    expect(isUndefined(false)).toBe(false)
  })

  it('should return false for object', () => {
    expect(isUndefined({})).toBe(false)
  })

  it('should return false for array', () => {
    expect(isUndefined([])).toBe(false)
  })
})
