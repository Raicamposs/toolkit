import { describe, expect, expectTypeOf, it } from 'vitest';
import { none, Option, some } from './option';

describe('Option', () => {
  describe('some', () => {
    it('deve criar um Some com o valor', () => {
      const result = some(42);

      expect(result.type).toBe('some');
      expect(result.value).toBe(42);
    });

    it('deve preservar o tipo do valor', () => {
      const result = some('hello');

      expectTypeOf(result.value).toEqualTypeOf<string>();
    });

    it('deve funcionar com objetos complexos', () => {
      const user = { id: 1, name: 'Ana' };
      const result = some(user);

      expect(result.type).toBe('some');
      expect(result.value).toEqual(user);
    });
  });

  describe('none', () => {
    it('deve ser um None', () => {
      expect(none.type).toBe('none');
    });

    it('deve ser o mesmo objeto (singleton)', () => {
      expect(none).toBe(none);
    });
  });

  describe('discriminated union', () => {
    it('deve permitir narrowing via type field', () => {
      function findUser(id: number): Option<string> {
        if (id === 1) return some('Ana');
        return none;
      }

      const found = findUser(1);
      const notFound = findUser(99);

      if (found.type === 'some') {
        expect(found.value).toBe('Ana');
      }

      expect(notFound.type).toBe('none');
    });
  });
});
