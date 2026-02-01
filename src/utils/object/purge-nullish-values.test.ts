import { describe, expect, it } from 'vitest';
import { purgeNullishValues } from './purge-nullish-values';

describe('purgeNullishValues', () => {
  it('deve retornar undefined para valores null', () => {
    const result = purgeNullishValues(null);
    expect(result).toBeUndefined();
  });

  it('deve retornar undefined para valores undefined', () => {
    const result = purgeNullishValues(undefined);
    expect(result).toBeUndefined();
  });

  it('deve retornar o valor primitivo inalterado', () => {
    expect(purgeNullishValues(42)).toBe(42);
    expect(purgeNullishValues('hello')).toBe('hello');
    expect(purgeNullishValues(true)).toBe(true);
    expect(purgeNullishValues(false)).toBe(false);
    expect(purgeNullishValues(0)).toBe(0);
  });

  it('deve remover valores nullish de um objeto', () => {
    const input = {
      name: 'John',
      age: null,
      city: 'New York',
      country: undefined,
      active: true,
    };

    const result = purgeNullishValues(input);

    expect(result).toEqual({
      name: 'John',
      city: 'New York',
      active: true,
    });
  });

  it('deve remover valores nullish de arrays', () => {
    const input = [1, null, 2, undefined, 3, null];

    const result = purgeNullishValues(input);

    expect(result).toEqual([1, 2, 3]);
  });

  it('deve processar objetos aninhados recursivamente', () => {
    const input = {
      user: {
        name: 'Alice',
        email: null,
        address: {
          street: 'Main St',
          city: null,
          zip: '12345',
        },
      },
      metadata: null,
    };

    const result = purgeNullishValues(input);

    expect(result).toEqual({
      user: {
        name: 'Alice',
        address: {
          street: 'Main St',
          zip: '12345',
        },
      },
    });
  });

  it('deve processar arrays aninhados recursivamente', () => {
    const input = [
      { id: 1, value: 'a' },
      { id: null, value: 'b' },
      { id: 3, value: null },
      null,
      { id: 4, value: 'd' },
    ];

    const result = purgeNullishValues(input);

    expect(result).toEqual([
      { id: 1, value: 'a' },
      { value: 'b' },
      { id: 3 },
      { id: 4, value: 'd' },
    ]);
  });

  it('deve retornar undefined para objetos que ficam vazios após limpeza', () => {
    const input = {
      a: null,
      b: undefined,
      c: null,
    };

    const result = purgeNullishValues(input);

    expect(result).toBeUndefined();
  });

  it('deve retornar array vazio para arrays que ficam vazios após limpeza', () => {
    const input = [null, undefined, null];

    const result = purgeNullishValues(input);

    expect(result).toEqual([]);
  });

  it('deve lidar com estruturas complexas mistas', () => {
    const input = {
      users: [
        { name: 'John', age: 30, email: null },
        null,
        { name: 'Jane', age: null, email: 'jane@example.com' },
      ],
      settings: {
        theme: 'dark',
        notifications: null,
        privacy: {
          public: true,
          friends: null,
        },
      },
      metadata: null,
    };

    const result = purgeNullishValues(input);

    expect(result).toEqual({
      users: [
        { name: 'John', age: 30 },
        { name: 'Jane', email: 'jane@example.com' },
      ],
      settings: {
        theme: 'dark',
        privacy: {
          public: true,
        },
      },
    });
  });

  it('deve preservar valores falsy que não são nullish', () => {
    const input = {
      zero: 0,
      emptyString: '',
      falseBool: false,
      nullValue: null,
      undefinedValue: undefined,
    };

    const result = purgeNullishValues(input);

    expect(result).toEqual({
      zero: 0,
      emptyString: '',
      falseBool: false,
    });
  });

  it('deve lidar com arrays de primitivos', () => {
    const input = [0, '', false, null, undefined, 'hello', 42];

    const result = purgeNullishValues(input);

    expect(result).toEqual([0, '', false, 'hello', 42]);
  });

  it('deve lidar com objetos profundamente aninhados', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            value: 'deep',
            nullValue: null,
          },
          anotherNull: null,
        },
      },
    };

    const result = purgeNullishValues(input);

    expect(result).toEqual({
      level1: {
        level2: {
          level3: {
            value: 'deep',
          },
        },
      },
    });
  });
});
