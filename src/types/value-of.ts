/**
 * Extracts the type of values from a given type with string or numeric keys.
 * @template T The input type, typically an object or record type
 * @returns A union type of all the values in the input type
 * @example
 * type MyObject = { a: string; b: number }
 * type Values = ValueOf<MyObject> // string | number
 */
export type ValueOf<T> = T[keyof T]
