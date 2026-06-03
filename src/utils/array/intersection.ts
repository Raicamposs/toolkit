/**
 * Returns elements that exist in both arrays (no duplicates).
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return [...new Set(a)].filter((item) => setB.has(item));
}

/**
 * Returns elements present in `a` but not in `b` (no duplicates).
 *
 * @example
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return [...new Set(a)].filter((item) => !setB.has(item));
}
