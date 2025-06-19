import { describe, expect, it } from 'vitest'
import { isEmpty } from './isEmpty'

describe('isEmpty', () => {
  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return true for whitespace string', () => {
    expect(isEmpty('   ')).toBe(true)
  })

  it('should return true for string with only tabs and newlines', () => {
    expect(isEmpty('\t\n')).toBe(true)
  })

  it('should return false for string with visible characters', () => {
    expect(isEmpty('test')).toBe(false)
  })

  it('should return false for string with whitespace and visible characters', () => {
    expect(isEmpty('  test  ')).toBe(false)
  })

  it('should return false for string with numbers', () => {
    expect(isEmpty('123')).toBe(false)
  })

  it('should return false for string with special characters', () => {
    expect(isEmpty('!@#')).toBe(false)
  })
})
