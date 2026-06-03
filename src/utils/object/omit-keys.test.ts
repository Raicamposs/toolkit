import { describe, expect, expectTypeOf, it } from 'vitest';
import { createFactory } from './create-factory';
import { mapValues } from './map-values';
import { omitKeys } from './omit-keys';

describe('omitKeys', () => {
  it('deve remover as chaves especificadas', () => {
    const obj = { id: 1, name: 'Ana', password: 'secret' };
    expect(omitKeys(obj, ['password'])).toEqual({ id: 1, name: 'Ana' });
  });
  it('deve remover múltiplas chaves', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(omitKeys(obj, ['a', 'c'])).toEqual({ b: 2, d: 4 });
  });
  it('deve retornar o objeto original se nenhuma chave for removida', () => {
    const obj = { a: 1, b: 2 };
    expect(omitKeys(obj, [])).toEqual({ a: 1, b: 2 });
  });
});

describe('mapValues', () => {
  it('deve transformar os valores mantendo as chaves', () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, (v) => v * 2)).toEqual({ a: 2, b: 4, c: 6 });
  });
  it('deve receber a chave como segundo argumento', () => {
    const result = mapValues({ x: 1, y: 2 }, (v, k) => `${String(k)}=${v}`);
    expect(result).toEqual({ x: 'x=1', y: 'y=2' });
  });
  it('deve funcionar com tipos diferentes de retorno', () => {
    const result = mapValues({ a: 1, b: 2 }, String);
    expectTypeOf(result).toEqualTypeOf<Record<'a' | 'b', string>>();
    expect(result).toEqual({ a: '1', b: '2' });
  });
});

describe('createFactory', () => {
  it('deve retornar os defaults quando chamado sem overrides', () => {
    const makeUser = createFactory({ id: '1', name: 'Ana', role: 'user' });
    expect(makeUser()).toEqual({ id: '1', name: 'Ana', role: 'user' });
  });
  it('deve sobrescrever as propriedades especificadas', () => {
    const makeUser = createFactory({ id: '1', name: 'Ana', role: 'user' });
    expect(makeUser({ name: 'Carlos' })).toEqual({ id: '1', name: 'Carlos', role: 'user' });
  });
  it('deve criar instâncias independentes a cada chamada', () => {
    const makeConfig = createFactory({ debug: false, timeout: 3000 });
    const a = makeConfig();
    const b = makeConfig({ debug: true });
    expect(a).toEqual({ debug: false, timeout: 3000 });
    expect(b).toEqual({ debug: true, timeout: 3000 });
  });
});
