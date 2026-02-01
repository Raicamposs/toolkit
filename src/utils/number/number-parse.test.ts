import { describe, expect, it } from 'vitest';
import { numberParse, numberParseDef } from './number-parse';

describe('numberParse', () => {
  describe('numberParse', () => {
    it('should parse a valid integer string', () => {
      expect(numberParse('123')).toBe(123);
    });

    it('should parse a valid decimal string', () => {
      expect(numberParse('123.45')).toBe(123.45);
    });

    it('should parse a negative number string', () => {
      expect(numberParse('-123.45')).toBe(-123.45);
    });

    it('should return undefined for non-numeric strings', () => {
      expect(numberParse('abc')).toBeUndefined();
    });

    it('should return 0 for an empty string', () => {
      expect(numberParse('')).toBe(0);
    });

    it('should handle multiple dots by returning undefined', () => {
      expect(numberParse('12.34.56')).toBeUndefined();
    });
  });

  describe('numberParseDef', () => {
    it('should parse a valid integer string', () => {
      expect(numberParseDef('123')).toBe(123);
    });

    it('should parse a valid decimal string', () => {
      expect(numberParseDef('123.45')).toBe(123.45);
    });

    it('should parse a negative number string', () => {
      expect(numberParseDef('-123.45')).toBe(-123.45);
    });

    it('should return 0 (default value) for non-numeric strings', () => {
      expect(numberParseDef('abc')).toBe(0);
    });

    it('should return 0 for an empty string', () => {
      expect(numberParseDef('')).toBe(0);
    });

    it('should handle multiple dots by returning 0 (default value)', () => {
      expect(numberParseDef('12.34.56')).toBe(0);
    });
  });
});
