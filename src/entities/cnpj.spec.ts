import { describe, expect, it } from 'vitest'
import { CNPJ } from './cnpj'

describe('CNPJ', function () {

  it('should validate', () => {
    expect(new CNPJ('01.103.144/0001-36').isValid).toBe(true)
  })

  it('should invalidate', () => {
    expect(new CNPJ('01.103.154/0001-36').isValid).toBe(false)
    expect(new CNPJ('').isValid).toBe(false)
    expect(new CNPJ(null as any).isValid).toBe(false)
    expect(new CNPJ(undefined as any).isValid).toBe(false)
  })

  it('should return numbers only', () => {
    expect(new CNPJ('01.103.144/0001-36').numbersOnly).toBe('01103144000136')
  })

  it('should return formatted value', () => {
    expect(new CNPJ('01103144000136').value).toBe('01.103.144/0001-36')
  })

  it('should return random value', () => {
    expect(CNPJ.random().isValid).toBe(true)
  })

  it('should return masked value', () => {
    expect(new CNPJ('01.103.144/0001-36').masked).toBe('01.***.***/0001-36')
  })

  it('should return masked value with numbers', () => {
    expect(new CNPJ(23218313000116).masked).toBe('23.***.***/0001-16')
  })

  it('Deve conter onze dígitos', () => {
    expect(CNPJ.check('16528951000178')).toBe(true)
    expect(CNPJ.check('16.528.951/0001-78')).toBe(true)

    expect(CNPJ.check('a'.repeat(14))).toBe(false)
    expect(CNPJ.check('16.528.951/000')).toBe(false)
    expect(CNPJ.check('')).toBe(false)
    expect(CNPJ.check(undefined)).toBe(false)
    expect(CNPJ.check(null as any)).toBe(false)
    expect(CNPJ.check([] as any)).toBe(false)
    expect(CNPJ.check('165289510001 7')).toBe(false)
    expect(CNPJ.check('1652895100017222')).toBe(false)
    expect(CNPJ.check('165289510001 7          ')).toBe(false)
  })

  it('Deve rejeitar números iguais', () => {
    expect(CNPJ.check('0'.repeat(14))).toBe(false)
    expect(CNPJ.check('1'.repeat(14))).toBe(false)
    expect(CNPJ.check('2'.repeat(14))).toBe(false)
    expect(CNPJ.check('3'.repeat(14))).toBe(false)
    expect(CNPJ.check('4'.repeat(14))).toBe(false)
    expect(CNPJ.check('5'.repeat(14))).toBe(false)
    expect(CNPJ.check('6'.repeat(14))).toBe(false)
    expect(CNPJ.check('7'.repeat(14))).toBe(false)
    expect(CNPJ.check('8'.repeat(14))).toBe(false)
    expect(CNPJ.check('9'.repeat(14))).toBe(false)
  })

  it('Deve validar', () => {
    expect(CNPJ.check('01.103.144/0001-36')).toBe(true)
    expect(CNPJ.check('35.139.348/0001-49')).toBe(true)
    expect(CNPJ.check('27.096.175/0001-09')).toBe(true)

    expect(CNPJ.check('01103144000136')).toBe(true)
    expect(CNPJ.check('35139348000149')).toBe(true)
    expect(CNPJ.check('27096175000109')).toBe(true)

    expect(CNPJ.check(35139348000149)).toBe(true)
    expect(CNPJ.check(27096175000109)).toBe(true)
  })

  it('Deve rejeitar', () => {
    expect(CNPJ.check('01.113.144/0001-36')).toBe(false)
    expect(CNPJ.check('35.119.348/0001-49')).toBe(false)
    expect(CNPJ.check('27.016.175/0001-09')).toBe(false)

    expect(CNPJ.check('01101144000136')).toBe(false)
    expect(CNPJ.check('35131348000149')).toBe(false)
    expect(CNPJ.check('27091175000109')).toBe(false)

    expect(CNPJ.check(35139148000149)).toBe(false)
    expect(CNPJ.check(27046175000109)).toBe(false)
  })

  it('Deve rejeitar tipos inválidos', () => {
    expect(CNPJ.check([] as any)).toBe(false)
    expect(CNPJ.check({} as any)).toBe(false)
  })
})
