import { describe, expect, it } from 'vitest'
import { nullIf } from './nullIf'
describe('nullIf', () => {
  it('should return null if value is null', () => {
    expect(nullIf(null, 'any_value')).toBeNull()
  })

  it('should return undefined if value is undefined', () => {
    expect(nullIf(undefined, 'any_value')).toBeUndefined()
  })

  it('should return null if value is nullValue', () => {
    expect(nullIf('any_value', 'any_value')).toBeNull()
  })

  it('should return value if value is not null and not nullValue', () => {
    expect(nullIf('any_value', 'any_other_value')).toBe('any_value')
  })

})
