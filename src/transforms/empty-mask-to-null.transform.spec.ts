import { EmptyMaskToNull } from './empty-mask-to-null.transform';

import { describe, expect, it } from 'vitest';
describe('EmptyMaskToNull', () => {
  it('should return null', () => {
    expect(EmptyMaskToNull.execute('')).toBeNull();
    expect(EmptyMaskToNull.execute('             ')).toBeNull();
    expect(EmptyMaskToNull.execute('--')).toBeNull();
    expect(EmptyMaskToNull.execute('/')).toBeNull();
    expect(EmptyMaskToNull.execute('. . ./-')).toBeNull();
    expect(EmptyMaskToNull.execute(undefined)).toBeNull();
    expect(EmptyMaskToNull.execute(null)).toBeNull();
    expect(EmptyMaskToNull.execute(9 as any)).toBeNull();
    expect(EmptyMaskToNull.execute(false as any)).toBeNull();
    expect(EmptyMaskToNull.execute({} as any)).toBeNull();
    expect(EmptyMaskToNull.execute([] as any)).toBeNull();
  });

  it('should return a initial value', () => {
    expect(EmptyMaskToNull.execute('59122-644')).toBe('59122-644');
    expect(EmptyMaskToNull.execute('633.942.410-48')).toBe('633.942.410-48');
    expect(EmptyMaskToNull.execute('067.695.349.514')).toBe('067.695.349.514');
    expect(EmptyMaskToNull.execute('29/10/2022')).toBe('29/10/2022');
    expect(EmptyMaskToNull.execute('14.856.193/0001-91')).toBe('14.856.193/0001-91');
    expect(EmptyMaskToNull.execute('5443 9306 3089 5797')).toBe('5443 9306 3089 5797');
  });
});
