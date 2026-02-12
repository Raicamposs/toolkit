import { describe, expect, it } from 'vitest';
import { isEmpty } from './is-empty';

describe('isEmpty', () => {
  it('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  it('should return true for whitespace string', () => {
    expect(isEmpty('   ')).toBe(true);
  });

  it('should return true for string with only tabs and newlines', () => {
    expect(isEmpty('\t\n')).toBe(true);
  });

  it('should return false for string with visible characters', () => {
    expect(isEmpty('test')).toBe(false);
  });

  it('should return false for string with whitespace and visible characters', () => {
    expect(isEmpty('  test  ')).toBe(false);
  });

  it('should return false for string with numbers', () => {
    expect(isEmpty('123')).toBe(false);
  });

  it('should return false for string with special characters', () => {
    expect(isEmpty('!@#')).toBe(false);
  });

  it('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return true for empty set', () => {
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return true for empty map', () => {
    expect(isEmpty(new Map())).toBe(true);
  });

  it('should return false for Date object', () => {
    expect(isEmpty(new Date())).toBe(false);
  });

  it('should return false for RegExp object', () => {
    expect(isEmpty(/test/)).toBe(false);
  });

  it('should return false for number 0', () => {
    expect(isEmpty(0)).toBe(false);
  });

  it('should return false for boolean false', () => {
    expect(isEmpty(false)).toBe(false);
  });
});
