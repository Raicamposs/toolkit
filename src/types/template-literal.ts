/**
 * Splits a string literal type by a delimiter into a tuple.
 *
 * @example
 * type Parts = Split<'a.b.c', '.'> // ['a', 'b', 'c']
 */
export type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

/**
 * Joins a tuple of string literals into a single string with a delimiter.
 *
 * @example
 * type Path = Join<['a', 'b', 'c'], '.'> // 'a.b.c'
 */
export type Join<T extends string[], D extends string> = T extends []
  ? ''
  : T extends [infer F extends string]
    ? F
    : T extends [infer F extends string, ...infer R extends string[]]
      ? `${F}${D}${Join<R, D>}`
      : never;

/**
 * Produces all valid dot-notation paths to properties in a nested object type.
 *
 * @example
 * type User = { name: string; address: { city: string; zip: string } }
 * type Paths = PathOf<User> // 'name' | 'address' | 'address.city' | 'address.zip'
 */
export type PathOf<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? K | `${K}.${PathOf<T[K]>}`
    : K
  : never;
