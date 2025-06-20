
import { describe, expect, it } from 'vitest'
import { Email } from './email'
describe('Email', () => {
  it('should create an instance of Email', () => {
    const email = new Email('test@example.com')
    expect(email).toBeInstanceOf(Email)
  })

  it('should have a value property', () => {
    const email = new Email('test@example.com')
    expect(email.value).toBe('test@example.com')
  })

  it('should have a username property', () => {
    const email = new Email('test@example.com')
    expect(email.username).toBe('test')
  })

  it('should have a domain property', () => {
    const email = new Email('test@example.com')
    expect(email.domain).toBe('example.com')
  })

  it('should throw an error if value is empty', () => {
    expect(() => new Email('')).toThrow('Email cannot be empty')
  })

  it('should throw an error if value is invalid', () => {
    expect(() => new Email('test')).toThrow('Invalid email')
    expect(() => new Email('tes')).toThrow('Invalid email')
    expect(() => new Email('a'.repeat(255).concat('@example.com'))).toThrow('Invalid email')
  })


  it('should validate a correct email', () => {
    const email = new Email('test@example.com')
    expect(email).toBeInstanceOf(Email)
  })
  it('should handle null or undefined', () => {
    const emails = Email.fromString(null)
    expect(emails).toHaveLength(0)
  })

  it('should handle empty string', () => {
    const emails = Email.fromString('')
    expect(emails).toHaveLength(0)
  })

  it('should handle single email from a string', () => {
    const emails = Email.fromString('test@example.com')
    expect(emails).toHaveLength(1)
    expect(emails[0]).toBeInstanceOf(Email)
    expect(emails[0].value).toBe('test@example.com')
    expect(emails[0].username).toBe('test')
    expect(emails[0].domain).toBe('example.com')
  })


  it('should handle multiple emails from a string', () => {
    const emails = Email.fromString('test1@example.com;test2@example.com')
    expect(emails).toHaveLength(2)
    expect(emails[0]).toBeInstanceOf(Email)
    expect(emails[1]).toBeInstanceOf(Email)
    expect(emails[0].value).toBe('test1@example.com')
    expect(emails[1].value).toBe('test2@example.com')
    expect(emails[0].username).toBe('test1')
    expect(emails[1].username).toBe('test2')
    expect(emails[0].domain).toBe('example.com')
    expect(emails[1].domain).toBe('example.com')
  })

  it('should generate a random email', () => {
    const email = Email.random()
    expect(email).toBeInstanceOf(Email)
    expect(email.isValid).toBe(true)
    expect(email.value).toMatch(/user\d+@example\.com/)
  })

  it('should check if an email is valid', () => {
    expect(Email.check('test@example.com')).toBe(true)
  })

  it('should check if an email is invalid', () => {
    expect(Email.check('test')).toBe(false)
    expect(Email.check('test@')).toBe(false)
    expect(Email.check('test@example')).toBe(false)
    expect(Email.check('test@example.')).toBe(false)
    expect(Email.check(undefined as any)).toBe(false)
  })

})
