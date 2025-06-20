import { describe, expect, it, vi } from 'vitest'
import { Phone } from './phone'

// Mock for coalesce since it's imported from utils
vi.mock('../utils', () => ({
  coalesce: (a: any, b: any) => (a == null ? b : a)
}))

describe('Phone', () => {
  it('should format 10-digit numbers correctly', () => {
    const phone = new Phone('1198765432')
    expect(phone.value).toBe('(11)9876-5432')
    expect(phone.toString()).toBe('(11)9876-5432')
    expect(phone.numbersOnly).toBe('1198765432')
  })

  it('should format 11-digit numbers correctly', () => {
    const phone = new Phone('11998765432')
    expect(phone.value).toBe('(11)99876-5432')
    expect(phone.toString()).toBe('(11)99876-5432')
    expect(phone.numbersOnly).toBe('11998765432')
  })

  it('should remove non-numeric characters', () => {
    const phone = new Phone('(11) 99876-5432')
    expect(phone.numbersOnly).toBe('11998765432')
    expect(phone.value).toBe('(11)99876-5432')
  })

  it('should handle empty input', () => {
    const phone = new Phone('')
    expect(phone.value).toBe('')
    expect(phone.numbersOnly).toBe('')
    expect(phone.isValid).toBe(false)
  })

  it('should validate correct phone numbers', () => {
    const validPhones = [
      '11998765432',
      '1132620231',
      '(11) 99876-5432',
      '(11) 3262-0231',
    ]
    for (const num of validPhones) {
      const phone = new Phone(num)
      expect(phone.isValid, num + " should be valid").toBe(true)
    }
  })

  it('should invalidate incorrect phone numbers', () => {
    const invalidPhones = [
      '0000000000',
      'abcdefghij',
      '123',
      '119876543', // too short
      '119876543210', // too long
      '0101234567', // invalid DDD
    ]
    for (const num of invalidPhones) {
      const phone = new Phone(num)
      expect(phone.isValid, num + " should be invalid").toBe(false)
    }
  })

  it('should generate a valid random phone', () => {
    const phone = Phone.random()
    expect(phone).toBeInstanceOf(Phone)
    expect(phone.isValid).toBe(true)
    expect(phone.numbersOnly.length).toBeGreaterThanOrEqual(10)
    expect(phone.numbersOnly.length).toBeLessThanOrEqual(11)
  })
})