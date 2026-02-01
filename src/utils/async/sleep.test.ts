import { describe, expect, it } from 'vitest';
import { sleep } from './sleep';

describe('sleep', () => {
  it('deve esperar o tempo especificado', async () => {
    const start = Date.now();
    await sleep(50);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(50);
  });

  it('deve esperar 0ms quando 0 é passado', async () => {
    const start = Date.now();
    await sleep(0);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(0);
  });

  it('deve esperar 100ms quando 100 é passado', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  it('não deve lançar erro quando ms é menor que 0', async () => {
    const start = Date.now();
    await sleep(-1);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(0);
  });
});
