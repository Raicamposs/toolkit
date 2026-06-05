import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve esperar o tempo especificado (50ms)', async () => {
    let resolvido = false;
    sleep(50).then(() => {
      resolvido = true;
    });

    expect(resolvido).toBe(false);

    // Avança 49ms, ainda não deve ter resolvido
    await vi.advanceTimersByTimeAsync(49);
    expect(resolvido).toBe(false);

    // Avança o último 1ms, agora deve resolver
    await vi.advanceTimersByTimeAsync(1);
    expect(resolvido).toBe(true);
  });

  it('deve resolver imediatamente quando 0ms é passado', async () => {
    let resolvido = false;
    sleep(0).then(() => {
      resolvido = true;
    });

    expect(resolvido).toBe(false);

    await vi.advanceTimersByTimeAsync(0);
    expect(resolvido).toBe(true);
  });

  it('deve esperar 100ms quando 100 é passado', async () => {
    let resolvido = false;
    sleep(100).then(() => {
      resolvido = true;
    });

    expect(resolvido).toBe(false);

    await vi.advanceTimersByTimeAsync(99);
    expect(resolvido).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(resolvido).toBe(true);
  });

  it('não deve lançar erro quando ms é menor que 0', async () => {
    let resolvido = false;
    sleep(-1).then(() => {
      resolvido = true;
    });

    expect(resolvido).toBe(false);

    // Valores negativos no setTimeout são tratados como 0 pelo Node/Browser
    await vi.advanceTimersByTimeAsync(0);
    expect(resolvido).toBe(true);
  });
});
