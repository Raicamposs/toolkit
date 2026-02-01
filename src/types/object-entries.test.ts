import { describe, expect, expectTypeOf, it } from 'vitest';
import { ObjectEntries } from './object-entries';

describe('ObjectEntries', () => {
  it('deve retornar array de entries tipadas', () => {
    const obj = {
      name: 'John',
      age: 30,
    };

    const entries = ObjectEntries(obj);

    expectTypeOf(entries).toExtend<[string, string | number][]>();
  });

  it('deve preservar tipos literais', () => {
    const obj = {
      status: 'active' as const,
      count: 42,
    };

    const entries = ObjectEntries(obj);

    expectTypeOf(entries).toExtend<[string, 'active' | number][]>();
  });

  it('deve retornar valores corretos em runtime', () => {
    const obj = { a: 1, b: 'hello' };
    const entries = ObjectEntries(obj);

    expectTypeOf(entries).toExtend<[string, number | string][]>();
    // Runtime check
    expect(entries).toEqual([
      ['a', 1],
      ['b', 'hello'],
    ]);
  });
});
