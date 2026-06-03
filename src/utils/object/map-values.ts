/**
 * Transforms each value of an object using `mapFn`, preserving the keys.
 *
 * @example
 * mapValues({ a: 1, b: 2, c: 3 }, v => v * 2)
 * // { a: 2, b: 4, c: 6 }
 */
export function mapValues<T extends object, U>(
  obj: T,
  mapFn: (value: T[keyof T], key: keyof T) => U,
): Record<keyof T, U> {
  return Object.fromEntries(
    (Object.entries(obj) as [keyof T, T[keyof T]][]).map(([k, v]) => [k, mapFn(v, k)]),
  ) as Record<keyof T, U>;
}
