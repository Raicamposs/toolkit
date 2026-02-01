import { describe, expect, expectTypeOf, it } from 'vitest';
import { ObjectKeys } from './object-keys';

describe('ObjectKeys', () => {
  it('deve retornar array de chaves tipadas', () => {
    const obj = {
      name: 'John',
      age: 30,
      isActive: true,
    };

    const keys = ObjectKeys(obj);

    expectTypeOf(keys).toEqualTypeOf<('name' | 'age' | 'isActive')[]>();
    expectTypeOf(keys).not.toEqualTypeOf<string[]>();
  });

  it('deve funcionar com interfaces', () => {
    interface User {
      id: number;
      name: string;
    }

    const user: User = { id: 1, name: 'John' };
    const keys = ObjectKeys(user);

    expectTypeOf(keys).toEqualTypeOf<('id' | 'name')[]>();
  });

  it('deve retornar valores corretos em runtime', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keys = ObjectKeys(obj);

    expectTypeOf(keys).toEqualTypeOf<('a' | 'b' | 'c')[]>();
    // Runtime check
    expect(keys).toEqual(['a', 'b', 'c']);
  });
});
