import { describe, expect, it } from 'vitest';
import { isFlagged } from './is-flagged';

interface User {
  id: number;
  name: string;
  isActive: boolean;
  isPremium: boolean;
  isVerified: boolean;
}

describe('isFlagged', () => {
  const activeUser: User = {
    id: 1,
    name: 'John',
    isActive: true,
    isPremium: false,
    isVerified: true,
  };

  const inactiveUser: User = {
    id: 2,
    name: 'Jane',
    isActive: false,
    isPremium: true,
    isVerified: false,
  };

  it('deve retornar true quando a propriedade booleana é true', () => {
    const isActiveUser = isFlagged<User>('isActive');

    expect(isActiveUser(activeUser)).toBe(true);
  });

  it('deve retornar false quando a propriedade booleana é false', () => {
    const isActiveUser = isFlagged<User>('isActive');

    expect(isActiveUser(inactiveUser)).toBe(false);
  });

  it('deve funcionar com diferentes propriedades', () => {
    const isPremiumUser = isFlagged<User>('isPremium');
    const isVerifiedUser = isFlagged<User>('isVerified');

    expect(isPremiumUser(activeUser)).toBe(false);
    expect(isPremiumUser(inactiveUser)).toBe(true);
    expect(isVerifiedUser(activeUser)).toBe(true);
    expect(isVerifiedUser(inactiveUser)).toBe(false);
  });

  it('deve funcionar com arrays usando filter', () => {
    const users = [activeUser, inactiveUser];
    const isActiveUser = isFlagged<User>('isActive');

    const activeUsers = users.filter(isActiveUser);

    expect(activeUsers).toHaveLength(1);
    expect(activeUsers[0]).toBe(activeUser);
  });

  it('deve converter valores truthy/falsy para boolean', () => {
    interface Data {
      count: number;
      text: string;
    }

    const hasCount = isFlagged<Data>('count');

    expect(hasCount({ count: 1, text: '' })).toBe(true);
    expect(hasCount({ count: 0, text: 'hello' })).toBe(false);
  });
});
