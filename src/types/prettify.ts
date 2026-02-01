/**
 * @description
 * Prettify a type to make it more readable
 * @template T
 * @param {T} T
 * @returns {T}
 * @example
 * type T = Prettify<{ a: 1; b: 2 }>
 * // T = { a: 1; b: 2 }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
