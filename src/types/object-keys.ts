/**
 * Retrieves the keys of an object as an array with proper type inference.
 * 
 * @template T The type of the input object
 * @param value The object to extract keys from
 * @returns An array of keys from the input object with correct type
 */
export const ObjectKeys = <T extends object>(value: T): Array<keyof T> =>
  Object.keys(value) as Array<keyof T>
