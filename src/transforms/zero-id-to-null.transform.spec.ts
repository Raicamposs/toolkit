import { ZeroIdToNull } from './zero-id-to-null.transform';

import { describe, expect, it } from 'vitest';
describe('ZeroIdToNull', () => {
  it('should return null', () => {
    expect(ZeroIdToNull.execute('0')).toBeNull();
    expect(ZeroIdToNull.execute('sdfsdfsd')).toBeNull();
    expect(ZeroIdToNull.execute(undefined)).toBeNull();
    expect(ZeroIdToNull.execute(null)).toBeNull();
    expect(ZeroIdToNull.execute(-1)).toBeNull();
    expect(ZeroIdToNull.execute('-1')).toBeNull();
  });
  it('should return a number', () => {
    expect(ZeroIdToNull.execute('7')).toBe(7);
    expect(ZeroIdToNull.execute('8')).toBe(8);
    expect(ZeroIdToNull.execute(4)).toBe(4);
    expect(ZeroIdToNull.execute(2)).toBe(2);
  });
});
