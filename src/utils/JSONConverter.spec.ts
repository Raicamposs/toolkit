import { describe, expect, it, vi } from 'vitest'
import { JSONConverter } from './JSONConverter'

// Mock dependencies
vi.mock('./isNullOrUndefined', () => ({
  isNullOrUndefined: (val: any) => val === null || val === undefined,
}))
vi.mock('./isEmpty', () => ({
  isEmpty: (val: any) => val === '' || val === undefined || val === null,
}))
vi.mock('./coalesce', () => ({
  coalesce: (a: any, b: any) => (a !== undefined && a !== null ? a : b),
}))

describe('JSONConverter', () => {
  describe('stringify', () => {
    it('should return null for null input', () => {
      expect(JSONConverter.stringify(null)).toBeNull()
    })

    it('should return null for undefined input', () => {
      expect(JSONConverter.stringify(undefined)).toBeNull()
    })

    it('should return JSON string for valid object', () => {
      expect(JSONConverter.stringify({ a: 1 })).toBe('{"a":1}')
    })

    it('should return JSON string for array', () => {
      expect(JSONConverter.stringify([1, 2, 3])).toBe('[1,2,3]')
    })

    it('should return JSON string for primitive values', () => {
      expect(JSONConverter.stringify(123)).toBe('123')
      expect(JSONConverter.stringify("abc")).toBe('"abc"')
      expect(JSONConverter.stringify(true)).toBe('true')
    })
  })

  describe('parse', () => {
    it('should return undefined for null input', () => {
      expect(JSONConverter.parse(null)).toBeUndefined()
    })

    it('should return undefined for undefined input', () => {
      expect(JSONConverter.parse(undefined)).toBeUndefined()
    })

    it('should return undefined for empty string', () => {
      expect(JSONConverter.parse('')).toBeUndefined()
      expect(JSONConverter.parse('   ')).toBeUndefined()
    })

    it('should parse valid JSON string', () => {
      expect(JSONConverter.parse('{"a":1}')).toEqual({ a: 1 })
      expect(JSONConverter.parse('[1,2,3]')).toEqual([1, 2, 3])
    })

    it('should return undefined for invalid JSON string', () => {
      expect(JSONConverter.parse('{a:1}')).toBeUndefined()
      expect(JSONConverter.parse('not json')).toBeUndefined()
    })
  })

  describe('parseWithDefault', () => {
    it('should return parsed object for valid JSON', () => {
      expect(JSONConverter.parseWithDefault('{"a":1}', { b: 2 })).toEqual({ a: 1 })
    })

    it('should return default value for null/undefined/empty/invalid input', () => {
      expect(JSONConverter.parseWithDefault(null, { b: 2 })).toEqual({ b: 2 })
      expect(JSONConverter.parseWithDefault(undefined, { b: 2 })).toEqual({ b: 2 })
      expect(JSONConverter.parseWithDefault('', { b: 2 })).toEqual({ b: 2 })
      expect(JSONConverter.parseWithDefault('   ', { b: 2 })).toEqual({ b: 2 })
      expect(JSONConverter.parseWithDefault('not json', { b: 2 })).toEqual({ b: 2 })
    })

    it('should use empty object as default if not provided', () => {
      expect(JSONConverter.parseWithDefault(null)).toEqual({})
      expect(JSONConverter.parseWithDefault('not json')).toEqual({})
    })
  })
})