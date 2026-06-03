/**
 * Removes all falsy values (`false`, `null`, `0`, `''`, `undefined`, `NaN`) from an array.
 *
 * @example
 * compact([0, 1, false, 2, '', 3, null, undefined]) // [1, 2, 3]
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(Boolean) as T[];
}
