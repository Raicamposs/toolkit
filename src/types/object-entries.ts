/**
 * Transforms an object type into an array of key-value tuples.
 * @template T The input object type
 * @returns An array of tuples where each tuple contains a string key and the corresponding value type
 * @example
 * type Example = Entries<{ a: number, b: string }> // [string, number | string][]
 */
export type Entries<T> = T extends { [key: string]: infer V } ? [string, V][] : never;

/**
 * Converts an object into an array of key-value pairs.
 * 
 * @template Obj The type of the input object
 * @param obj The object to convert to entries
 * @returns An array of tuples containing the object's keys and corresponding values
 */
export const ObjectEntries = <T extends { [key: string]: unknown }>(value: T): Entries<T> =>
  Object.entries(value) as Entries<T>;


