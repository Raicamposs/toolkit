import { describe, expectTypeOf, it } from 'vitest';
import { RequireAtLeastOne } from './require-at-least-one';

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
