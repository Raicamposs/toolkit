import { describe, expect, it } from 'vitest'
import { isNull } from './isNull'

describe('isNull', () => {
  it('should return true when value is null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false when value is undefined', () => {
    expect(isNull(undefined)).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(isNull('')).toBe(false)
  })

  it('should return false for zero', () => {
    expect(isNull(0)).toBe(false)
  })

  it('should return false for false boolean', () => {
    expect(isNull(false)).toBe(false)
  })

  it('should return false for object', () => {
    expect(isNull({})).toBe(false)
  })

  it('should return false for array', () => {
    expect(isNull([])).toBe(false)
  })

  it('should return false for NaN', () => {
    expect(isNull(NaN)).toBe(false)
  })
})
