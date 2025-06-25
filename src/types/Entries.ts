/**
 * Transforms an object type into an array of key-value tuples.
 * @template T The input object type
 * @returns An array of tuples where each tuple contains a string key and the corresponding value type
 * @example
 * type Example = Entries<{ a: number, b: string }> // [string, number | string][]
 */
export type Entries<T> = T extends { [key: string]: infer V } ? [string, V][] : never;
