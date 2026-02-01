import { describe, expectTypeOf, it } from 'vitest';
import { literal } from './literal';

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
