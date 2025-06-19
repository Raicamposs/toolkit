import { describe, expect, it } from 'vitest'
import { undefinedIf } from './undefinedIf'
describe('undefinedIf', () => {
  it('should return null if value is null', () => {
    expect(undefinedIf(null, 'any_value')).toBeNull()
  })

  it('should return undefined if value is undefined', () => {
    expect(undefinedIf(undefined, 'any_value')).toBeUndefined()
  })

  it('should return undefined if value is checkValue', () => {
    expect(undefinedIf('any_value', 'any_value')).toBeUndefined()
  })

  it('should return value if value is not undefined and not checkValue', () => {
    expect(undefinedIf('any_value', 'any_other_value')).toBe('any_value')
  })

})
