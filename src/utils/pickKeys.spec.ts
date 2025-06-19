import { describe, expect, it } from 'vitest'
import { pickKeys } from './pickKeys'

describe('pickKeys', () => {
  it('should pick specified keys from an object', () => {
    const obj = { name: 'John', age: 30, city: 'New York' }
    const result = pickKeys(obj, 'name', 'age')
    expect(result).toEqual({ name: 'John', age: 30 })
  })

  it('should return empty object when no keys specified', () => {
    const obj = { name: 'John', age: 30 }
    const result = pickKeys(obj)
    expect(result).toEqual({})
  })

  it('should handle single key selection', () => {
    const obj = { name: 'John', age: 30, city: 'New York' }
    const result = pickKeys(obj, 'name')
    expect(result).toEqual({ name: 'John' })
  })

  it('should handle undefined values', () => {
    const obj = { name: 'John', age: undefined, city: 'New York' }
    const result = pickKeys(obj, 'name', 'age')
    expect(result).toEqual({ name: 'John', age: undefined })
  })

  it('should handle nested objects', () => {
    const obj = {
      name: 'John',
      address: { street: 'Main St', city: 'New York' }
    }
    const result = pickKeys(obj, 'name', 'address')
    expect(result).toEqual({
      name: 'John',
      address: { street: 'Main St', city: 'New York' }
    })
  })

  it('should maintain object reference for nested objects', () => {
    const obj = {
      name: 'John',
      address: { street: 'Main St' }
    }
    const result = pickKeys(obj, 'address')
    expect(result.address).toBe(obj.address)
  })
})
