/**
 * Converts a union type to an intersection type.
 *
 * @example
 * type AB = UnionToIntersection<{ a: string } | { b: number }>
 * // { a: string } & { b: number }
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

/**
 * Extracts the last member of a union type (order is not guaranteed by TS spec,
 * but this behaves consistently in practice via contravariant inference).
 */
export type UnionLast<T> =
  UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R ? R : never;

/**
 * Converts a union type to a tuple type.
 * The order reflects how TypeScript resolves union members internally.
 *
 * @example
 * type T = UnionToTuple<'a' | 'b' | 'c'> // ['a', 'b', 'c'] (or some permutation)
 */
export type UnionToTuple<T, L = UnionLast<T>> = [T] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, L>>, L];
