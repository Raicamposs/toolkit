import { describe, expect, it } from 'vitest';
import { Ttl } from './time-to-live';

describe('Ttl', () => {
  it('should create a Ttl from milliseconds (Ttl.of)', () => {
    const ttl = Ttl.of(5_000);
    expect(ttl.ms).toBe(5_000);
  });

  it('should create a Ttl from seconds', () => {
    const ttl = Ttl.seconds(30);
    expect(ttl.ms).toBe(30_000);
  });

  it('should create a Ttl from minutes', () => {
    const ttl = Ttl.minutes(10);
    expect(ttl.ms).toBe(600_000);
  });

  it('should create a Ttl from hours', () => {
    const ttl = Ttl.hours(2);
    expect(ttl.ms).toBe(7_200_000);
  });

  it('should create a Ttl from days', () => {
    const ttl = Ttl.days(7);
    expect(ttl.ms).toBe(604_800_000);
  });

  it('should create a Ttl from weeks', () => {
    const ttl = Ttl.weeks(1);
    expect(ttl.ms).toBe(604_800_000);
  });

  it('should create a Ttl from months', () => {
    const ttl = Ttl.months(1);
    expect(ttl.ms).toBe(2_592_000_000); // 30 dias
  });

  it('should create a Ttl from years', () => {
    const ttl = Ttl.years(1);
    expect(ttl.ms).toBe(31_536_000_000); // 365 dias
  });

  it('should work with legacy aliases (backwards compatibility)', () => {
    expect(Ttl.seconds(1).ms).toBe(1000);
    expect(Ttl.minutes(1).ms).toBe(60_000);
    expect(Ttl.hours(1).ms).toBe(3_600_000);
    expect(Ttl.days(1).ms).toBe(86_400_000);
    expect(Ttl.weeks(1).ms).toBe(604_800_000);
  });

  it('should get units normalized', () => {
    const ttl = Ttl.of(3_600_000);
    expect(ttl.hours).toBe(1);
    expect(ttl.minutes).toBe(60);
    expect(ttl.seconds).toBe(3600);
  });

  it('should add two Ttls', () => {
    const ttl = Ttl.hours(1).add(Ttl.minutes(30));
    expect(ttl.ms).toBe(5_400_000); // 3_600_000 + 1_800_000
  });

  it('should handle invalid input in add (defaulting to 0 ms)', () => {
    const ttl = Ttl.hours(1);
    expect(ttl.add(null).ms).toBe(ttl.ms);
    expect(ttl.add(undefined).ms).toBe(ttl.ms);
    expect(ttl.add({} as any).ms).toBe(ttl.ms);
  });

  it('should scale a Ttl', () => {
    const ttl = Ttl.hours(1).scale(0.5);
    expect(ttl.ms).toBe(1_800_000);
  });

  it('should check if a Ttl is expired', () => {
    const ttl = Ttl.seconds(5);
    const createdAt = Date.now() - 10_000;
    expect(ttl.isExpired(createdAt)).toBe(true);
  });

  it('should get expires at date', () => {
    const ttl = Ttl.seconds(5);
    const createdAt = Date.now() - 1000;
    expect(ttl.expiresAt(createdAt).getTime()).toBe(createdAt + 5000);

    // Testa o parâmetro default (Date.now()) para cobertura de branch
    expect(ttl.expiresAt().getTime()).toBeGreaterThanOrEqual(Date.now());
  });

  it('should convert to readable string', () => {
    expect(Ttl.seconds(45).toString()).toBe('45s');
    expect(Ttl.minutes(10).toString()).toBe('10m');
    expect(Ttl.minutes(90).toString()).toBe('1.5h');
    expect(Ttl.hours(1).toString()).toBe('1h');
    expect(Ttl.hours(48).toString()).toBe('2d');
    expect(Ttl.days(3).toString()).toBe('3d');
  });

  describe('Ttl.fromMs/resolve (Interoperability)', () => {
    it('should resolve from another Ttl instance', () => {
      const ttl = Ttl.seconds(30);
      expect(Ttl.fromMs(ttl)).toBe(30_000);
    });

    it('should resolve from a simple object unit', () => {
      expect(Ttl.fromMs({ hour: 2 })).toBe(7_200_000);
    });

    it('should resolve from an object with mixed values (summing units)', () => {
      const ms = Ttl.fromMs({ hour: 1, minute: 30, second: 15 });
      expect(ms).toBe(3_600_000 + 1_800_000 + 15_000);
    });

    it('should handle negative values in mixed objects', () => {
      const ms = Ttl.fromMs({ hour: 1, minute: -30, second: 15 });
      expect(ms).toBe(3_600_000 - 1_800_000 + 15_000);
    });

    it('should return undefined for empty objects or unknown keys', () => {
      expect(Ttl.fromMs({} as any)).toBeUndefined();
      expect(Ttl.fromMs(null)).toBeUndefined();
      expect(Ttl.fromMs(undefined)).toBeUndefined();
    });

    it('should resolve (Ttl.resolve) returns a Ttl instance or undefined', () => {
      const ttl = Ttl.resolve({ minute: 1 });
      expect(ttl).toBeInstanceOf(Ttl);
      expect(ttl?.ms).toBe(60_000);

      expect(Ttl.resolve(null)).toBeUndefined();
    });
  });
});
