import { describe, expect, it } from 'vitest'
import { clone } from './clone'

describe('clone', () => {
  it('should create a deep copy of a simple object', () => {
    const original = { name: 'test', value: 123 }
    const cloned = clone(original)
    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
  })

  it('should clone nested objects', () => {
    const original = {
      outer: {
        inner: {
          value: 'test'
        }
      }
    }
    const cloned = clone(original)
    expect(cloned).toEqual(original)
    expect(cloned.outer).not.toBe(original.outer)
  })

  it('should clone arrays', () => {
    const original = [1, 2, 3]
    const cloned = clone(original)
    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
  })

  it('should clone array of objects', () => {
    const original = [{ id: 1 }, { id: 2 }]
    const cloned = clone(original)
    expect(cloned).toEqual(original)
    expect(cloned[0]).not.toBe(original[0])
  })

  it('should handle null values', () => {
    const original = { value: null }
    const cloned = clone(original)
    expect(cloned).toEqual(original)
  })

  it('should handle primitive values', () => {
    expect(clone(42)).toBe(42)
    expect(clone('test')).toBe('test')
    expect(clone(true)).toBe(true)
  })

  it('should clone Date objects', () => {
    const original = { date: new Date('2023-01-01') }
    const cloned = clone(original)
    expect(cloned.date).toEqual(original.date)
  })
})
