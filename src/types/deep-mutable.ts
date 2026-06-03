/**
 * Recursively removes the `readonly` modifier from all properties.
 *
 * @example
 * type Frozen = { readonly name: string; readonly nested: { readonly id: number } }
 * type Mutable = DeepMutable<Frozen>
 * // { name: string; nested: { id: number } }
 */
export type DeepMutable<T> = T extends object
  ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
  : T
