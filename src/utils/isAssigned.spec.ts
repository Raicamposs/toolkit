import { describe, expect, it } from 'vitest'
import { isAssigned } from './isAssigned'

describe('isAssigned', () => {
  it('should return true for non-null values', () => {
    expect(isAssigned(0)).toBe(true)
    expect(isAssigned('')).toBe(true)
    expect(isAssigned(false)).toBe(true)
    expect(isAssigned({})).toBe(true)
    expect(isAssigned([])).toBe(true)
  })

  it('should return false for null', () => {
    expect(isAssigned(null)).toBe(false)
  })

  it('should return false for undefined', () => {
    expect(isAssigned(undefined)).toBe(false)
  })

  it('should handle complex objects', () => {
    const obj = { test: 'value' }
    expect(isAssigned(obj)).toBe(true)
  })

  it('should handle Date objects', () => {
    expect(isAssigned(new Date())).toBe(true)
  })

  it('should handle functions', () => {
    expect(isAssigned(() => { })).toBe(true)
  })
})
