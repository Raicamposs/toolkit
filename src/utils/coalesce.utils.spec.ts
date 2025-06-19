import { describe, expect, it } from 'vitest'
import { coalesce } from './coalesce.utils'
describe('Coalesce Utils', () => {
  it('should return default if null', () => {
    expect(coalesce(null, 'any_default')).toBe('any_default')
  })

  it('should return default if undefined', () => {
    expect(coalesce(undefined, 'any_default')).toBe('any_default')
  })

  it('should return value if not null or undefined', () => {
    expect(coalesce('any_valid_value', 'any_default')).toBe('any_valid_value')
  })
})
