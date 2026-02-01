import { describe, expect, it } from 'vitest';
import { and, not, or, SpecOf } from './spec';

interface User {
  id: number;
  name: string;
  age: number;
  isPremium: boolean;
  isActive: boolean;
}

describe('SpecOf and Logical Operators', () => {
  const isAdult: SpecOf<User> = (user) => user.age >= 18;
  const isPremium: SpecOf<User> = (user) => user.isPremium;
  const isActive: SpecOf<User> = (user) => user.isActive;

  const adultUser: User = {
    id: 1,
    name: 'John',
    age: 25,
    isPremium: false,
    isActive: true,
  };

  const minorUser: User = {
    id: 2,
    name: 'Jane',
    age: 16,
    isPremium: true,
    isActive: true,
  };

  const inactiveUser: User = {
    id: 3,
    name: 'Bob',
    age: 30,
    isPremium: true,
    isActive: false,
  };

  describe('and', () => {
    it('deve retornar true quando todas as specs são satisfeitas', () => {
      const isAdultAndPremium = and(isAdult, isPremium);

      expect(isAdultAndPremium({ ...adultUser, isPremium: true })).toBe(true);
    });

    it('deve retornar false quando pelo menos uma spec não é satisfeita', () => {
      const isAdultAndPremium = and(isAdult, isPremium);

      expect(isAdultAndPremium(adultUser)).toBe(false);
      expect(isAdultAndPremium(minorUser)).toBe(false);
    });

    it('deve funcionar com múltiplas specs', () => {
      const isAdultPremiumAndActive = and(isAdult, isPremium, isActive);

      expect(isAdultPremiumAndActive({ ...adultUser, isPremium: true })).toBe(true);
      expect(isAdultPremiumAndActive(inactiveUser)).toBe(false);
    });

    it('deve retornar true quando não há specs', () => {
      const alwaysTrue = and<User>();

      expect(alwaysTrue(adultUser)).toBe(true);
    });
  });

  describe('or', () => {
    it('deve retornar true quando pelo menos uma spec é satisfeita', () => {
      const isAdultOrPremium = or(isAdult, isPremium);

      expect(isAdultOrPremium(adultUser)).toBe(true);
      expect(isAdultOrPremium(minorUser)).toBe(true);
    });

    it('deve retornar false quando nenhuma spec é satisfeita', () => {
      const isAdultOrPremium = or(isAdult, isPremium);

      expect(isAdultOrPremium({ ...minorUser, isPremium: false })).toBe(false);
    });

    it('deve funcionar com múltiplas specs', () => {
      const hasAnyQuality = or(isAdult, isPremium, isActive);

      expect(hasAnyQuality(adultUser)).toBe(true);
      expect(hasAnyQuality(minorUser)).toBe(true);
      expect(hasAnyQuality({ ...minorUser, isPremium: false, isActive: false })).toBe(false);
    });

    it('deve retornar false quando não há specs', () => {
      const alwaysFalse = or<User>();

      expect(alwaysFalse(adultUser)).toBe(false);
    });
  });

  describe('not', () => {
    it('deve negar uma spec', () => {
      const isMinor = not(isAdult);

      expect(isMinor(minorUser)).toBe(true);
      expect(isMinor(adultUser)).toBe(false);
    });

    it('deve funcionar com specs compostas', () => {
      const isNotAdultOrPremium = not(or(isAdult, isPremium));

      expect(isNotAdultOrPremium({ ...minorUser, isPremium: false })).toBe(true);
      expect(isNotAdultOrPremium(adultUser)).toBe(false);
      expect(isNotAdultOrPremium(minorUser)).toBe(false);
    });

    it('deve aplicar dupla negação corretamente', () => {
      const doubleNegation = not(not(isAdult));

      expect(doubleNegation(adultUser)).toBe(true);
      expect(doubleNegation(minorUser)).toBe(false);
    });
  });

  describe('Composição Complexa', () => {
    it('deve combinar and, or e not', () => {
      // (isAdult AND isPremium) OR (NOT isActive)
      const complexSpec = or(and(isAdult, isPremium), not(isActive));

      expect(complexSpec({ ...adultUser, isPremium: true })).toBe(true); // adult + premium
      expect(complexSpec(inactiveUser)).toBe(true); // not active
      expect(complexSpec(adultUser)).toBe(false); // adult but not premium and active
    });

    it('deve permitir composições aninhadas', () => {
      // isAdult AND (isPremium OR isActive)
      const nestedSpec = and(isAdult, or(isPremium, isActive));

      expect(nestedSpec(adultUser)).toBe(true);
      expect(nestedSpec({ ...adultUser, isPremium: true, isActive: false })).toBe(true);
      expect(nestedSpec({ ...adultUser, isPremium: false, isActive: false })).toBe(false);
      expect(nestedSpec(minorUser)).toBe(false);
    });
  });
});
