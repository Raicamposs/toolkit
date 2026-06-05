import { EmptyValueToNull } from './empty-value-to-null.transform';

import { describe, expect, it } from 'vitest';
describe('EmptyValueToNull', () => {
  it('should return null', () => {
    expect(EmptyValueToNull.execute('')).toBeNull();
    expect(EmptyValueToNull.execute('             ')).toBeNull();
    expect(EmptyValueToNull.execute(undefined)).toBeNull();
    expect(EmptyValueToNull.execute(null)).toBeNull();
  });
  it('should return a initial value', () => {
    expect(EmptyValueToNull.execute(4)).toBe(4);
    expect(EmptyValueToNull.execute(false)).toBe(false);
    expect(EmptyValueToNull.execute('a')).toBe('a');
    expect(EmptyValueToNull.execute('b ')).toBe('b ');
  });
});
