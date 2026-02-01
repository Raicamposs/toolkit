import { describe, expect, expectTypeOf, it } from 'vitest';
import { literal } from './literal';
import { Nullable } from './nullable';
import { ObjectEntries } from './object-entries';
import { ObjectKeys } from './object-keys';
import { OmitNullableProperties } from './omit-nullable-properties';
import { Optional } from './optional';
import { Prettify } from './prettify';
import { Replace } from './replace';
import { RequireAtLeastOne } from './require-at-least-one';
import { ValueOf } from './value-of';

describe('Type Utilities', () => {
  describe('literal', () => {
    it('deve criar um tipo literal a partir de uma string', () => {
      const myLiteral = literal('hello');

      // Verifica que o tipo é exatamente 'hello', não string
      expectTypeOf(myLiteral).toEqualTypeOf<'hello'>();
      expectTypeOf(myLiteral).not.toEqualTypeOf<string>();
    });

    it('deve preservar diferentes valores literais', () => {
      const literal1 = literal('foo');
      const literal2 = literal('bar');

      expectTypeOf(literal1).toEqualTypeOf<'foo'>();
      expectTypeOf(literal2).toEqualTypeOf<'bar'>();
      expectTypeOf(literal1).not.toEqualTypeOf(literal2);
    });

    it('deve funcionar com strings vazias', () => {
      const emptyLiteral = literal('');

      expectTypeOf(emptyLiteral).toEqualTypeOf<''>();
    });
  });

  describe('Nullable', () => {
    it('deve permitir null e undefined', () => {
      type NullableString = Nullable<string>;

      const value1: NullableString = 'hello';
      const value2: NullableString = null;
      const value3: NullableString = undefined;

      expectTypeOf(value1).toExtend<string | null | undefined>();
      expectTypeOf(value2).toExtend<string | null | undefined>();
      expectTypeOf(value3).toExtend<string | null | undefined>();
    });

    it('deve funcionar com tipos complexos', () => {
      interface User {
        name: string;
        age: number;
      }

      type NullableUser = Nullable<User>;

      const user1: NullableUser = { name: 'John', age: 30 };
      const user2: NullableUser = null;
      const user3: NullableUser = undefined;

      expectTypeOf(user1).toExtend<User | null | undefined>();
      expectTypeOf(user2).toExtend<User | null | undefined>();
      expectTypeOf(user3).toExtend<User | null | undefined>();
    });
  });

  describe('Optional', () => {
    it('deve tornar propriedades específicas opcionais', () => {
      interface User {
        id: number;
        name: string;
        email: string;
      }

      type UserWithOptionalEmail = Optional<User, 'email'>;

      const user1: UserWithOptionalEmail = { id: 1, name: 'John' };
      const user2: UserWithOptionalEmail = { id: 1, name: 'John', email: 'john@example.com' };

      expectTypeOf(user1).toExtend<{ id: number; name: string; email?: string }>();
      expectTypeOf(user2).toExtend<{ id: number; name: string; email?: string }>();
    });

    it('deve tornar múltiplas propriedades opcionais', () => {
      interface Post {
        id: string;
        title: string;
        content: string;
        authorId: string;
      }

      type PostWithOptionalIds = Optional<Post, 'id' | 'authorId'>;

      const post: PostWithOptionalIds = {
        title: 'Hello World',
        content: 'This is a post',
      };

      expectTypeOf(post).toExtend<{
        id?: string;
        title: string;
        content: string;
        authorId?: string;
      }>();
    });
  });

  describe('RequireAtLeastOne', () => {
    it('deve exigir pelo menos uma propriedade', () => {
      interface Contact {
        email: string;
        phone: string;
        address: string;
      }

      type ContactMethod = RequireAtLeastOne<Contact>;

      // Válidos
      const contact1: ContactMethod = { email: 'test@example.com' };
      const contact2: ContactMethod = { phone: '123456789' };
      const contact3: ContactMethod = { email: 'test@example.com', phone: '123456789' };

      expectTypeOf(contact1).toExtend<ContactMethod>();
      expectTypeOf(contact2).toExtend<ContactMethod>();
      expectTypeOf(contact3).toExtend<ContactMethod>();

      // @ts-expect-error - Objeto vazio não deve ser permitido
      const invalid: ContactMethod = {};
    });

    it('deve funcionar com dois campos', () => {
      interface TwoFields {
        a: string;
        b: number;
      }

      type AtLeastOne = RequireAtLeastOne<TwoFields>;

      const valid1: AtLeastOne = { a: 'hello' };
      const valid2: AtLeastOne = { b: 42 };
      const valid3: AtLeastOne = { a: 'hello', b: 42 };

      expectTypeOf(valid1).toExtend<AtLeastOne>();
      expectTypeOf(valid2).toExtend<AtLeastOne>();
      expectTypeOf(valid3).toExtend<AtLeastOne>();
    });
  });

  describe('ValueOf', () => {
    it('deve extrair tipos de valores de um objeto', () => {
      interface User {
        id: number;
        name: string;
        isActive: boolean;
      }

      type UserValue = ValueOf<User>;

      const value1: UserValue = 123;
      const value2: UserValue = 'John';
      const value3: UserValue = true;

      expectTypeOf(value1).toExtend<number | string | boolean>();
      expectTypeOf(value2).toExtend<number | string | boolean>();
      expectTypeOf(value3).toExtend<number | string | boolean>();
    });

    it('deve funcionar com objetos literais', () => {
      const config = {
        host: 'localhost',
        port: 3000,
        secure: true,
      } as const;

      type ConfigValue = ValueOf<typeof config>;

      expectTypeOf<ConfigValue>().toEqualTypeOf<'localhost' | 3000 | true>();
    });
  });

  describe('Replace', () => {
    it('deve substituir propriedades de um tipo', () => {
      interface User {
        id: number;
        name: string;
        createdAt: Date;
      }

      type UserWithStringDate = Replace<User, { createdAt: string }>;

      const user: UserWithStringDate = {
        id: 1,
        name: 'John',
        createdAt: '2024-01-01',
      };

      expectTypeOf(user.id).toEqualTypeOf<number>();
      expectTypeOf(user.name).toEqualTypeOf<string>();
      expectTypeOf(user.createdAt).toEqualTypeOf<string>();
      expectTypeOf(user.createdAt).not.toEqualTypeOf<Date>();
    });

    it('deve manter outras propriedades inalteradas', () => {
      interface Product {
        id: number;
        name: string;
        price: number;
      }

      type ProductWithStringPrice = Replace<Product, { price: string }>;

      const product: ProductWithStringPrice = {
        id: 1,
        name: 'Laptop',
        price: '999.99',
      };

      expectTypeOf(product.id).toEqualTypeOf<number>();
      expectTypeOf(product.name).toEqualTypeOf<string>();
      expectTypeOf(product.price).toEqualTypeOf<string>();
    });
  });

  describe('OmitNullableProperties', () => {
    it('deve remover propriedades nullable', () => {
      interface User {
        id: number;
        name: string;
        email: string | null;
        phone: string | undefined;
        age: number | null | undefined;
      }

      type NonNullableUser = OmitNullableProperties<User>;

      // NonNullableUser deve ter apenas id e name
      expectTypeOf<NonNullableUser>().toExtend<{
        id: number;
        name: string;
      }>();

      expectTypeOf<NonNullableUser>().not.toExtend<{
        id: number;
        name: string;
        email: string;
      }>();
    });
  });

  describe('Prettify', () => {
    it('deve simplificar tipos complexos para melhor legibilidade', () => {
      interface Base {
        id: number;
      }

      interface Extended extends Base {
        name: string;
      }

      type PrettifiedExtended = Prettify<Extended>;

      const obj: PrettifiedExtended = {
        id: 1,
        name: 'John',
      };

      expectTypeOf(obj).toExtend<{ id: number; name: string }>();
    });

    it('deve funcionar com tipos interseccionados', () => {
      type A = { a: string };
      type B = { b: number };
      type C = A & B;

      type PrettifiedC = Prettify<C>;

      const obj: PrettifiedC = {
        a: 'hello',
        b: 42,
      };

      expectTypeOf(obj).toExtend<{ a: string; b: number }>();
    });
  });

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

  describe('Testes de Compilação', () => {
    it('deve falhar em tempo de compilação para tipos incorretos', () => {
      interface User {
        name: string;
        age: number;
      }

      // @ts-expect-error - idade deve ser number, não string
      const invalidUser: User = { name: 'John', age: '30' };

      // @ts-expect-error - propriedade obrigatória faltando
      const incompleteUser: User = { name: 'John' };
    });

    it('deve aceitar tipos corretos', () => {
      interface User {
        name: string;
        age: number;
      }

      const validUser: User = { name: 'John', age: 30 };

      expectTypeOf(validUser).toExtend<User>();
    });
  });
});
