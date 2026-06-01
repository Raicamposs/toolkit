import { describe, expect, it } from 'vitest';
import { NumberRange } from './number-range';

describe('NumberRange', () => {
  it('deve criar um NumberRange válido', () => {
    const range = new NumberRange(10, 20);

    expect(range.start).toBe(10);
    expect(range.end).toBe(20);
  });

  it('deve lançar Error se o start for maior que o end', () => {
    expect(() => new NumberRange(20, 10)).toThrow(Error);
    expect(() => new NumberRange(20, 10)).toThrow('Start must be less than or equal to end');
  });

  it('deve permitir start igual ao end', () => {
    const range = new NumberRange(10, 10);

    expect(range.start).toBe(10);
    expect(range.end).toBe(10);
  });

  it('deve permitir valores negativos', () => {
    const range = new NumberRange(-50, -10);

    expect(range.start).toBe(-50);
    expect(range.end).toBe(-10);
  });
});
