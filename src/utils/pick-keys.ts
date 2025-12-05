/**
 * Picks specified keys from an object, creating a new object with only those keys.
 * 
 * @template T The type of the source object
 * @template K The keys to pick from the source object
 * @param obj The source object to pick keys from
 * @param keys The keys to extract from the source object
 * @returns A new object containing only the specified keys from the source object
 */
export function pickKeys<T extends object, K extends keyof T>(
  obj: T,
  ...keys: Array<K>
): Partial<T> {
  const output: Partial<T> = {}
  return keys.reduce((data, key) => {
    data[key] = obj[key]
    return data
  }, output)
}
