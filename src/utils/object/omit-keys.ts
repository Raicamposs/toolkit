/**
 * Returns a new object without the specified keys. Inverse of `pickKeys`.
 *
 * @example
 * omitKeys({ id: 1, name: 'Ana', password: 'x' }, ['password'])
 * // { id: 1, name: 'Ana' }
 */
export function omitKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const keysSet = new Set<string>(keys as string[]);
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !keysSet.has(k))) as Omit<T, K>;
}
