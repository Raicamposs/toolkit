import { describe, expect, it } from 'vitest';
import { retryBackoffExponencial } from './retry-with-backoff';

describe('retryBackoffExponencial', () => {
  it('deve tentar novamente uma função que falhar e eventualmente ter sucesso', async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 3) {
        throw new Error('Falhou');
      }
      return 'Sucesso';
    };

    const result = await retryBackoffExponencial({ fn, maxRetries: 3, delay: 100 });
    expect(result).toBe('Sucesso');
    expect(attempts).toBe(3);
  });

  it('deve lançar um erro se a função falhar após todas as tentativas', async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      throw new Error('Falhou');
    };

    await expect(retryBackoffExponencial({ fn, maxRetries: 3, delay: 100 })).rejects.toThrow(
      'Falhou'
    );
    expect(attempts).toBe(3);
  });

  it('deve lançar um erro se maxRetries for menor que 1', async () => {
    const fn = async () => {
      throw new Error('Falhou');
    };

    await expect(retryBackoffExponencial({ fn, maxRetries: 0, delay: 100 })).rejects.toThrow(
      'maxRetries deve ser maior que 0'
    );
  });

  it('deve lançar um erro se delay for menor que 1', async () => {
    const fn = async () => {
      throw new Error('Falhou');
    };

    await expect(retryBackoffExponencial({ fn, maxRetries: 3, delay: 0 })).rejects.toThrow(
      'delay deve ser maior que 0'
    );
  });

  it('deve lançar um erro se fn não for fornecido', async () => {
    await expect(
      retryBackoffExponencial({ fn: undefined as any, maxRetries: 3, delay: 100 })
    ).rejects.toThrow('fn é obrigatório');
  });
});
