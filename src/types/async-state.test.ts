import { describe, expect, expectTypeOf, it } from 'vitest';
import { asyncError, asyncLoading, asyncSuccess, AsyncState } from './async-state';

describe('AsyncState', () => {
  describe('asyncLoading', () => {
    it('deve criar estado de loading', () => {
      const state = asyncLoading();
      expect(state.status).toBe('loading');
    });
  });

  describe('asyncSuccess', () => {
    it('deve criar estado de sucesso com dado', () => {
      const state = asyncSuccess(42);
      expect(state.status).toBe('success');
      expect(state.data).toBe(42);
    });

    it('deve preservar o tipo do dado', () => {
      const state = asyncSuccess({ id: 1, name: 'Ana' });
      expectTypeOf(state.data).toEqualTypeOf<{ id: number; name: string }>();
    });
  });

  describe('asyncError', () => {
    it('deve criar estado de erro', () => {
      const error = new Error('Falhou');
      const state = asyncError(error);
      expect(state.status).toBe('error');
      expect(state.error).toBe(error);
    });

    it('deve funcionar com erros customizados', () => {
      const state = asyncError('mensagem de erro');
      expect(state.error).toBe('mensagem de erro');
    });
  });

  describe('discriminated union', () => {
    it('deve permitir narrowing pelo campo status', () => {
      function handleState<T>(state: AsyncState<T>): string {
        switch (state.status) {
          case 'loading': return 'carregando';
          case 'success': return `dado: ${JSON.stringify(state.data)}`;
          case 'error': return `erro: ${state.error}`;
        }
      }

      expect(handleState(asyncLoading())).toBe('carregando');
      expect(handleState(asyncSuccess(5))).toBe('dado: 5');
      expect(handleState(asyncError('ops'))).toBe('erro: ops');
    });
  });
});
