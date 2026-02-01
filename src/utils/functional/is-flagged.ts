/**
 * Checks if a boolean property is true
 *
 * @param key - The key of the boolean property to check
 * @returns A predicate function that checks if the property is true
 *
 * @example
 * ```typescript
 * interface User {
 *   isActive: boolean;
 *   isPremium: boolean;
 * }
 *
 * const isActiveUser = isFlagged<User>('isActive');
 * const isPremiumUser = isFlagged<User>('isPremium');
 *
 * isActiveUser({ isActive: true, isPremium: false }); // true
 * isPremiumUser({ isActive: true, isPremium: false }); // false
 * ```
 */
export const isFlagged =
  <T>(key: keyof T) =>
  (e: T) =>
    Boolean(e[key]);
