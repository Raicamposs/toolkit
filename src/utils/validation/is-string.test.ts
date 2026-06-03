import { describe, expect, it } from 'vitest';
import { isArray, isArrayOf } from './is-array';
import { isBoolean } from './is-boolean';
import { isDate } from './is-date';
import { isFunction } from './is-function';
import { isNumber } from './is-number';
import { isString } from './is-string';

describe('isString', () => {
  it('deve retornar true para strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('hello')).toBe(true);
  });
  it('deve retornar false para não-strings', () => {
    expect(isString(42)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString([])).toBe(false);
  });
});

describe('isNumber', () => {
  it('deve retornar true para números válidos', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(42)).toBe(true);
    expect(isNumber(-3.14)).toBe(true);
  });
  it('deve retornar false para NaN e não-números', () => {
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber('42')).toBe(false);
    expect(isNumber(null)).toBe(false);
  });
});

describe('isBoolean', () => {
  it('deve retornar true para booleanos', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });
  it('deve retornar false para não-booleanos', () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(null)).toBe(false);
  });
});

describe('isArray', () => {
  it('deve retornar true para arrays', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
  });
  it('deve retornar false para não-arrays', () => {
    expect(isArray({})).toBe(false);
    expect(isArray('array')).toBe(false);
    expect(isArray(null)).toBe(false);
  });
});

describe('isArrayOf', () => {
  it('deve validar que todos os elementos passam no guard', () => {
    expect(isArrayOf([1, 2, 3], isNumber)).toBe(true);
    expect(isArrayOf(['a', 'b'], isString)).toBe(true);
  });
  it('deve retornar false se algum elemento falhar', () => {
    expect(isArrayOf([1, 'x', 3], isNumber)).toBe(false);
    expect(isArrayOf([], isNumber)).toBe(true);
  });
});

describe('isFunction', () => {
  it('deve retornar true para funções', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
  });
  it('deve retornar false para não-funções', () => {
    expect(isFunction(42)).toBe(false);
    expect(isFunction(null)).toBe(false);
  });
});

describe('isDate', () => {
  it('deve retornar true para datas válidas', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('2024-01-01'))).toBe(true);
  });
  it('deve retornar false para datas inválidas e não-datas', () => {
    expect(isDate(new Date('invalid'))).toBe(false);
    expect(isDate('2024-01-01')).toBe(false);
    expect(isDate(null)).toBe(false);
  });
});
