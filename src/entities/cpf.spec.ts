import { describe, expect, it } from 'vitest'
import { CPF } from './cpf'

describe('CPF', function () {
  it('should validate', () => {
    expect(new CPF('123.456.789-09').isValid).toBe(true)
  })

  it('should invalidate', () => {
    expect(new CPF('123.416.789-09').isValid).toBe(false)
    expect(new CPF('').isValid).toBe(false)
    expect(new CPF(null).isValid).toBe(false)
    expect(new CPF(undefined).isValid).toBe(false)
  })

  it('should return numbers only', () => {
    expect(new CPF('123.456.789-09').numbersOnly).toBe('12345678909')
  })

  it('should return formatted value', () => {
    expect(new CPF('12345678909').value).toBe('123.456.789-09')
  })

  it('should return random value', () => {
    expect(CPF.random().isValid).toBe(true)
  })

  it('should return masked value', () => {
    expect(new CPF('123.456.789-09').masked).toBe('123.***.***-09')
  })

  it('should return masked value with numbers', () => {
    expect(new CPF(12345678909).masked).toBe('123.***.***-09')
  })

  it('Deve conter onze dígitos', () => {
    expect(CPF.check('12345678909')).toBe(true)
    expect(CPF.check('123.456.789-09')).toBe(true)

    expect(CPF.check('a'.repeat(11))).toBe(false)
    expect(CPF.check('123.456')).toBe(false)
    expect(CPF.check('')).toBe(false)
    expect(CPF.check(undefined)).toBe(false)
    expect(CPF.check(null as any)).toBe(false)

    expect(CPF.check('123456789 9')).toBe(false)
    expect(CPF.check('1234567890900')).toBe(false)
  })

  it('Deve rejeitar números iguais', () => {
    expect(CPF.check('0'.repeat(11))).toBe(false)
    expect(CPF.check('1'.repeat(11))).toBe(false)
    expect(CPF.check('2'.repeat(11))).toBe(false)
    expect(CPF.check('3'.repeat(11))).toBe(false)
    expect(CPF.check('4'.repeat(11))).toBe(false)
    expect(CPF.check('5'.repeat(11))).toBe(false)
    expect(CPF.check('6'.repeat(11))).toBe(false)
    expect(CPF.check('7'.repeat(11))).toBe(false)
    expect(CPF.check('8'.repeat(11))).toBe(false)
    expect(CPF.check('9'.repeat(11))).toBe(false)
  })

  it('Deve validar', () => {
    expect(CPF.check('729.968.950-29')).toBe(true)
    expect(CPF.check('594.125.230-76')).toBe(true)
    expect(CPF.check('184.768.960-42')).toBe(true)

    expect(CPF.check('72996895029')).toBe(true)
    expect(CPF.check('59412523076')).toBe(true)
    expect(CPF.check('18476896042')).toBe(true)

    expect(CPF.check(72996895029)).toBe(true)
    expect(CPF.check(59412523076)).toBe(true)
    expect(CPF.check(18476896042)).toBe(true)
  })

  it('Deve rejeitar', () => {
    expect(CPF.check('721.968.950-29')).toBe(false)
    expect(CPF.check('591.125.230-76')).toBe(false)
    expect(CPF.check('181.768.960-42')).toBe(false)

    expect(CPF.check('72196895029')).toBe(false)
    expect(CPF.check('59112523076')).toBe(false)
    expect(CPF.check('18176896042')).toBe(false)

    expect(CPF.check(72196895029)).toBe(false)
    expect(CPF.check(59112523076)).toBe(false)
    expect(CPF.check(18176896042)).toBe(false)
  })

  it('Deve rejeitar tipos inválidos', () => {
    expect(CPF.check([] as any)).toBe(false)
    expect(CPF.check({} as any)).toBe(false)
  })
})
