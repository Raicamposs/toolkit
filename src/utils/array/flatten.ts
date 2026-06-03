/**
 * Flattens an array of arrays into a single array (one level deep).
 *
 * @example
 * flatten([[1, 2], [3, 4], [5]]) // [1, 2, 3, 4, 5]
 */
export function flatten<T>(array: T[][]): T[] {
  return array.flat();
}

/**
 * Recursively flattens a deeply nested array.
 *
 * @example
 * flattenDeep([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
 */
export function flattenDeep(array: unknown[]): unknown[] {
  return array.flat(Infinity) as unknown[];
}
