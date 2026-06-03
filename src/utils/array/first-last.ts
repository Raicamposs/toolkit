/**
 * Returns the first element of an array, or `undefined` if empty.
 *
 * @example
 * first([1, 2, 3]) // 1
 * first([])        // undefined
 */
export function first<T>(array: T[]): T | undefined {
  return array[0];
}

/**
 * Returns the last element of an array, or `undefined` if empty.
 *
 * @example
 * last([1, 2, 3]) // 3
 * last([])        // undefined
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
