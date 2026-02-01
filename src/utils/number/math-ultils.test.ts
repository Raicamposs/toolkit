import { describe, expect, it } from 'vitest';
import { MathUtils } from './math-ultils';
describe('MathUtils', () => {
  describe('calculatePercentage', () => {
    it('should calculate the percentage correctly', () => {
      // Arrange
      const value = 50;
      const percentage = 20;

      // Act
      const result = MathUtils.calculatePercentage(value, percentage);

      // Assert
      expect(result).toBe(10);
    });

    it('should return 0 if the value is undefined', () => {
      // Arrange
      const value = undefined;
      const percentage = 20;

      // Act
      const result = MathUtils.calculatePercentage(value as any, percentage);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 if the value is null', () => {
      // Arrange
      const value = null;
      const percentage = 20;

      // Act
      const result = MathUtils.calculatePercentage(value as any, percentage);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 if the percentage is undefined', () => {
      // Arrange
      const value = 50;
      const percentage = undefined as any;

      // Act
      const result = MathUtils.calculatePercentage(value, percentage);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 if the percentage is null', () => {
      // Arrange
      const value = 50;
      const percentage = null as any;

      // Act
      const result = MathUtils.calculatePercentage(value, percentage);

      // Assert
      expect(result).toBe(0);
    });
  });

  describe('calculatePercentageOf', () => {
    it('should return 0 if the value is undefined', () => {
      // Arrange
      const value = undefined as any;
      const total = 50;

      // Act
      const result = MathUtils.calculatePercentageOf(value, total);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 if the value is null', () => {
      // Arrange
      const value = null as any;
      const total = 50;

      // Act
      const result = MathUtils.calculatePercentageOf(value, total);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 if the total is undefined', () => {
      // Arrange
      const value = 10;
      const total = undefined as any;

      // Act
      const result = MathUtils.calculatePercentageOf(value, total);

      // Assert
      expect(result).toBe(0);
    });

    it('should return 0 if the total is null', () => {
      // Arrange
      const value = 10;
      const total = null as any;

      // Act
      const result = MathUtils.calculatePercentageOf(value, total);

      // Assert
      expect(result).toBe(0);
    });
    it('should calculate the percentage of a value correctly', () => {
      // Arrange
      const value = 10;
      const total = 50;

      // Act
      const result = MathUtils.calculatePercentageOf(value, total);

      // Assert
      expect(result).toBe(20);
    });
  });

  describe('isFractional', () => {
    it('should return true if the value is fractional', () => {
      // Arrange
      const value = 1.5;

      // Act
      const result = MathUtils.isFractional(value);

      // Assert
      expect(result).toBe(true);
    });

    it('should return false if the value is not fractional', () => {
      // Arrange
      const value = 2;

      // Act
      const result = MathUtils.isFractional(value);

      // Assert
      expect(result).toBe(false);
    });

    it('should return false if the value is undefined', () => {
      // Arrange
      const value = undefined as any;

      // Act
      const result = MathUtils.isFractional(value);

      // Assert
      expect(result).toBe(false);
    });
  });
});
