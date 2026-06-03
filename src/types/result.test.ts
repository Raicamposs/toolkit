import { describe, expect, expectTypeOf, it } from 'vitest';
import { err, ok, Result } from './result';

describe('Result', () => {
  describe('ok', () => {
    it('deve criar um resultado de sucesso com o dado', () => {
      const result = ok(42);

      expect(result.success).toBe(true);
      expect((result as Extract<typeof result, { success: true }>).data).toBe(42);
    });

    it('deve preservar o tipo do dado', () => {
      const result = ok('hello');

      expectTypeOf(result).toExtend<{ success: true; data: string }>();
    });

    it('deve funcionar com objetos complexos', () => {
      const user = { id: 1, name: 'Ana' };
      const result = ok(user);

      expect(result.success).toBe(true);
      expect((result as Extract<typeof result, { success: true }>).data).toEqual(user);
    });
  });

  describe('err', () => {
    it('deve criar um resultado de falha com o erro', () => {
      const result = err('Algo deu errado');

      expect(result.success).toBe(false);
      expect((result as Extract<typeof result, { success: false }>).error).toBe('Algo deu errado');
    });

    it('deve funcionar com Error nativo', () => {
      const error = new Error('Falha de rede');
      const result = err(error);

      expect(result.success).toBe(false);
      expect((result as Extract<typeof result, { success: false }>).error).toBe(error);
    });
  });

  describe('discriminated union', () => {
    it('deve permitir narrowing via success flag', () => {
      function divide(a: number, b: number): Result<number, string> {
        if (b === 0) return err('Divisão por zero');
        return ok(a / b);
      }

      const success = divide(10, 2);
      const failure = divide(10, 0);

      if (success.success) {
        expect(success.data).toBe(5);
      }

      if (!failure.success) {
        expect(failure.error).toBe('Divisão por zero');
      }
    });
  });
});
