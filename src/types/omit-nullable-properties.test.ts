import { describe, expectTypeOf, it } from 'vitest';
import { OmitNullableProperties } from './omit-nullable-properties';

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
