import { describe, expect, it } from 'vitest'
import { withoutKey } from './withoutKey'

describe('withoutKey', () => {
  it('should remove specified key from object', () => {
    const obj = { name: 'test', age: 25, city: 'London' }
    const result = withoutKey(obj, 'age')
    expect(result).toEqual({ name: 'test', city: 'London' })
  })

  it('should handle object with single property', () => {
    const obj = { name: 'test' }
    const result = withoutKey(obj, 'name')
    expect(result).toEqual({})
  })

  it('should return same object if key does not exist', () => {
    const obj = { name: 'test', age: 25 }
    const result = withoutKey(obj, 'city')
    expect(result).toEqual(obj)
  })

  it('should handle object with nested properties', () => {
    const obj = { name: 'test', details: { age: 25, city: 'London' } }
    const result = withoutKey(obj, 'details')
    expect(result).toEqual({ name: 'test' })
  })

  it('should handle object with null values', () => {
    const obj = { name: 'test', age: null }
    const result = withoutKey(obj, 'age')
    expect(result).toEqual({ name: 'test' })
  })

  it('should preserve object reference for unaffected properties', () => {
    const nestedObj = { value: 42 }
    const obj = { name: 'test', data: nestedObj }
    const result = withoutKey(obj, 'name')
    expect(result.data).toBe(nestedObj)
  })
})
