export abstract class MathUtils {
  static calculatePercentage(value: number, percentage: number): number {
    if (value === undefined || value === null) return 0;
    if (percentage === undefined || percentage === null) return 0;
    return (value * percentage) / 100;
  }

  static calculatePercentageOf(value: number, total: number): number {
    if (value === undefined || value === null) return 0;
    if (total === undefined || total === null) return 0;
    return (value * 100) / total;
  }

  static isFractional(value: number): boolean {
    if (value === undefined || value === null) return false;
    return value % 1 !== 0;
  }

  static isInteger(value: number): boolean {
    if (value === undefined || value === null) return false;
    return value % 1 === 0;
  }

  static isEven(value: number): boolean {
    if (value === undefined || value === null) return false;
    return value % 2 === 0;
  }

  static isOdd(value: number): boolean {
    if (value === undefined || value === null) return false;
    return value % 2 !== 0;
  }

  static isPrime(value: number): boolean {
    if (value === undefined || value === null) return false;
    if (value < 2) return false;
    for (let i = 2; i < value; i++) {
      if (value % i === 0) return false;
    }
    return true;
  }

  static isPerfectSquare(value: number): boolean {
    if (value === undefined || value === null) return false;
    const root = Math.sqrt(value);
    return root % 1 === 0;
  }

  static isPerfectCube(value: number): boolean {
    if (value === undefined || value === null) return false;
    const root = Math.cbrt(value);
    return root % 1 === 0;
  }

  static isPerfectPower(value: number): boolean {
    if (value === undefined || value === null) return false;
    const root = Math.cbrt(value);
    return root % 1 === 0;
  }

  static sum(...values: number[]): number {
    return values.reduce((a, b) => a + b, 0);
  }

  static average(...values: number[]): number {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  static max(...values: number[]): number {
    return Math.max(...values);
  }

  static min(...values: number[]): number {
    return Math.min(...values);
  }

  static range(start: number, end: number): number[] {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  static random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
