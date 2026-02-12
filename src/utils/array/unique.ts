/**
 * Returns a new array with unique values from the original array.
 * Supports primitive types and objects reference equality.
 *
 * @param array - The input array
 * @returns A new array with unique values
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
