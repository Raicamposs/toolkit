/**
 * Predicate function type for objects of type T
 * Returns true only if all conditions are satisfied
 */
export type SpecOf<T> = (e: T) => boolean;

/**
 * Combines multiple specs and returns true only if all are satisfied
 *
 * @param specs - Array of specification predicates
 * @returns A new spec that returns true only if all input specs return true
 *
 * @example
 * ```typescript
 * const isAdult: SpecOf<User> = (user) => user.age >= 18;
 * const isPremium: SpecOf<User> = (user) => user.isPremium;
 * const isAdultPremium = and(isAdult, isPremium);
 *
 * isAdultPremium({ age: 25, isPremium: true }); // true
 * isAdultPremium({ age: 25, isPremium: false }); // false
 * ```
 */
export const and =
  <T>(...specs: SpecOf<T>[]): SpecOf<T> =>
  (e) =>
    specs.every((spec) => spec(e));

/**
 * Combines multiple specs and returns true if at least one is satisfied
 *
 * @param specs - Array of specification predicates
 * @returns A new spec that returns true if any input spec returns true
 *
 * @example
 * ```typescript
 * const isAdult: SpecOf<User> = (user) => user.age >= 18;
 * const isPremium: SpecOf<User> = (user) => user.isPremium;
 * const canAccess = or(isAdult, isPremium);
 *
 * canAccess({ age: 16, isPremium: true }); // true
 * canAccess({ age: 25, isPremium: false }); // true
 * canAccess({ age: 16, isPremium: false }); // false
 * ```
 */
export const or =
  <T>(...specs: SpecOf<T>[]): SpecOf<T> =>
  (e) =>
    specs.some((spec) => spec(e));

/**
 * Negates a spec
 *
 * @param spec - Specification predicate to negate
 * @returns A new spec that returns the opposite of the input spec
 *
 * @example
 * ```typescript
 * const isAdult: SpecOf<User> = (user) => user.age >= 18;
 * const isMinor = not(isAdult);
 *
 * isMinor({ age: 16 }); // true
 * isMinor({ age: 25 }); // false
 * ```
 */
export const not =
  <T>(spec: SpecOf<T>): SpecOf<T> =>
  (e) =>
    !spec(e);
