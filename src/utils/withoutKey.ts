/**
 * Excludes a specific key from an object and returns a new object without that key.
 * 
 * @template T The type of the input object
 * @template U The type of the key to be excluded
 * @param {T} obj The source object
 * @param {U} key The key to be removed from the object
 * @returns {Omit<T, U>} A new object with the specified key removed
 */
export function withoutKey<T extends object, U extends keyof any>(
  obj: T,
  key: U,
) {
  const { [key]: _, ...newObj } = obj
  return newObj
}