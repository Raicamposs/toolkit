import { describe, expect, it } from 'vitest';
import { assertNever, exhaustiveCheck } from './assert-never';

describe('assertNever', () => {
  it('deve lançar um erro com mensagem padrão', () => {
    expect(() => assertNever('valor' as never)).toThrow('Unhandled value: "valor"');
  });

  it('deve lançar um erro com mensagem customizada', () => {
    expect(() => assertNever('x' as never, 'Caso não tratado')).toThrow('Caso não tratado');
  });

  it('deve garantir exaustividade em switch em tempo de compilação', () => {
    type Direction = 'left' | 'right';

    function handle(d: Direction): string {
      switch (d) {
        case 'left': return 'esquerda';
        case 'right': return 'direita';
        default: return assertNever(d);
      }
    }

    expect(handle('left')).toBe('esquerda');
    expect(handle('right')).toBe('direita');
  });
});

describe('exhaustiveCheck', () => {
  it('deve ser uma função que não faz nada em runtime', () => {
    expect(() => exhaustiveCheck('x' as never)).not.toThrow();
  });
});
