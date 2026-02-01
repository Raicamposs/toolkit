import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MS_PER_MINUTE, recent } from './recent';

interface User {
  id: number;
  name: string;
  createdAt: Date;
  lastLoginAt: Date;
}

describe('recent', () => {
  beforeEach(() => {
    // Reset time mocks before each test
    vi.useRealTimers();
  });

  it('deve retornar true para datas recentes dentro do intervalo', () => {
    const now = new Date();
    const recentDate = new Date(now.getTime() - 2 * MS_PER_MINUTE); // 2 minutes ago

    const isRecentlyCreated = recent<User, 'createdAt'>({
      key: 'createdAt',
      minutes: 5,
    });

    const user: User = {
      id: 1,
      name: 'John',
      createdAt: recentDate,
      lastLoginAt: now,
    };

    expect(isRecentlyCreated(user)).toBe(true);
  });

  it('deve retornar false para datas antigas fora do intervalo', () => {
    const now = new Date();
    const oldDate = new Date(now.getTime() - 10 * MS_PER_MINUTE); // 10 minutes ago

    const isRecentlyCreated = recent<User, 'createdAt'>({
      key: 'createdAt',
      minutes: 5,
    });

    const user: User = {
      id: 1,
      name: 'John',
      createdAt: oldDate,
      lastLoginAt: now,
    };

    expect(isRecentlyCreated(user)).toBe(false);
  });

  it('deve funcionar com diferentes propriedades de data', () => {
    const now = new Date();
    const recentLogin = new Date(now.getTime() - 1 * MS_PER_MINUTE); // 1 minute ago
    const oldCreation = new Date(now.getTime() - 100 * MS_PER_MINUTE); // 100 minutes ago

    const isRecentLogin = recent<User, 'lastLoginAt'>({
      key: 'lastLoginAt',
      minutes: 5,
    });

    const user: User = {
      id: 1,
      name: 'John',
      createdAt: oldCreation,
      lastLoginAt: recentLogin,
    };

    expect(isRecentLogin(user)).toBe(true);
  });

  it('deve retornar true para data exatamente no limite', () => {
    const now = new Date();
    const exactLimit = new Date(now.getTime() - 5 * MS_PER_MINUTE); // exactly 5 minutes ago

    const isRecentlyCreated = recent<User, 'createdAt'>({
      key: 'createdAt',
      minutes: 5,
    });

    const user: User = {
      id: 1,
      name: 'John',
      createdAt: exactLimit,
      lastLoginAt: now,
    };

    expect(isRecentlyCreated(user)).toBe(true);
  });

  it('deve funcionar com arrays usando filter', () => {
    const now = new Date();

    const users: User[] = [
      {
        id: 1,
        name: 'John',
        createdAt: new Date(now.getTime() - 2 * MS_PER_MINUTE),
        lastLoginAt: now,
      },
      {
        id: 2,
        name: 'Jane',
        createdAt: new Date(now.getTime() - 10 * MS_PER_MINUTE),
        lastLoginAt: now,
      },
      {
        id: 3,
        name: 'Bob',
        createdAt: new Date(now.getTime() - 1 * MS_PER_MINUTE),
        lastLoginAt: now,
      },
    ];

    const isRecentlyCreated = recent<User, 'createdAt'>({
      key: 'createdAt',
      minutes: 5,
    });

    const recentUsers = users.filter(isRecentlyCreated);

    expect(recentUsers).toHaveLength(2);
    expect(recentUsers.map((u) => u.id)).toEqual([1, 3]);
  });

  it('deve funcionar com diferentes intervalos de tempo', () => {
    const now = new Date();
    const date = new Date(now.getTime() - 30 * MS_PER_MINUTE); // 30 minutes ago

    const isRecent60 = recent<User, 'createdAt'>({
      key: 'createdAt',
      minutes: 60,
    });

    const isRecent15 = recent<User, 'createdAt'>({
      key: 'createdAt',
      minutes: 15,
    });

    const user: User = {
      id: 1,
      name: 'John',
      createdAt: date,
      lastLoginAt: now,
    };

    expect(isRecent60(user)).toBe(true);
    expect(isRecent15(user)).toBe(false);
  });

  it('deve validar MS_PER_MINUTE constante', () => {
    expect(MS_PER_MINUTE).toBe(60000);
  });
});
