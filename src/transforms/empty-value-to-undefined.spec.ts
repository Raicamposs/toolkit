import { EmptyValueToUndefined } from './empty-value-to-undefined.transform';

import { describe, expect, it } from 'vitest';
describe('EmptyValueToUndefined', () => {
  it('should return null', () => {
    expect(EmptyValueToUndefined.execute('')).toBeUndefined();
    expect(EmptyValueToUndefined.execute('             ')).toBeUndefined();
    expect(EmptyValueToUndefined.execute(undefined)).toBeUndefined();
    expect(EmptyValueToUndefined.execute(null)).toBeUndefined();
  });
  it('should return a initial value', () => {
    expect(EmptyValueToUndefined.execute(4)).toBe(4);
    expect(EmptyValueToUndefined.execute(false)).toBe(false);
    expect(EmptyValueToUndefined.execute('a')).toBe('a');
    expect(EmptyValueToUndefined.execute('b ')).toBe('b ');
  });
});
