import { describe, expect, it } from 'vitest';
import { DateRange } from './date-range';

describe('DateRange', () => {
  it('deve criar um DateRange válido', () => {
    const start = new Date('2026-01-01T00:00:00Z');
    const end = new Date('2026-12-31T23:59:59Z');
    const range = new DateRange(start, end);

    expect(range.start).toEqual(start);
    expect(range.end).toEqual(end);
  });

  it('deve lançar RangeError se o start for maior que o end', () => {
    const start = new Date('2026-12-31T23:59:59Z');
    const end = new Date('2026-01-01T00:00:00Z');

    expect(() => new DateRange(start, end)).toThrow(RangeError);
    expect(() => new DateRange(start, end)).toThrow('Start must be less than or equal to end');
  });

  it('deve permitir start igual ao end', () => {
    const date = new Date('2026-01-01T00:00:00Z');
    const range = new DateRange(date, date);

    expect(range.start).toEqual(date);
    expect(range.end).toEqual(date);
  });

  it('deve criar um DateRange válido a partir de strings', () => {
    const range = DateRange.fromString('2026-01-01', '2026-12-31');

    expect(range.start).toBeInstanceOf(Date);
    expect(range.end).toBeInstanceOf(Date);
    expect(range.start.toISOString().startsWith('2026-01-01')).toBe(true);
    expect(range.end.toISOString().startsWith('2026-12-31')).toBe(true);
  });

  it('deve lançar RangeError ao usar fromString com start > end', () => {
    expect(() => DateRange.fromString('2026-12-31', '2026-01-01')).toThrow(RangeError);
  });
});
