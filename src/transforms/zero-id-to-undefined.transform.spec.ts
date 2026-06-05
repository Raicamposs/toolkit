import { ZeroIdToNull } from './zero-id-to-null.transform';

import { describe, expect, it } from 'vitest';
describe('ZeroIdToNull', () => {
  it('should return null', () => {
    expect(ZeroIdToNull.execute('0')).toBeDefined();
    expect(ZeroIdToNull.execute('sdfsdfsd')).toBeDefined();
    expect(ZeroIdToNull.execute(undefined)).toBeDefined();
    expect(ZeroIdToNull.execute(null)).toBeDefined();
    expect(ZeroIdToNull.execute(-1)).toBeDefined();
    expect(ZeroIdToNull.execute('-1')).toBeDefined();
  });
  it('should return a number', () => {
    expect(ZeroIdToNull.execute('7')).toBe(7);
    expect(ZeroIdToNull.execute('8')).toBe(8);
    expect(ZeroIdToNull.execute(4)).toBe(4);
    expect(ZeroIdToNull.execute(2)).toBe(2);
  });
});
