import { describe, expectTypeOf, it } from 'vitest';
import { Prettify } from './prettify';

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
