/**
 * An array guaranteed to have at least one element.
 *
 * @example
 * function first<T>(arr: NonEmptyArray<T>): T {
 *   return arr[0] // safe — no undefined check needed
 * }
 */
export type NonEmptyArray<T> = [T, ...T[]];

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

/**
 * A tuple of exactly `N` elements of type `T`.
 *
 * @example
 * type Pair = Tuple<string, 2> // [string, string]
 * type Triple = Tuple<number, 3> // [number, number, number]
 */
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

/**
 * An array with at least `N` elements of type `T`.
 *
 * @example
 * type AtLeastTwo = AtLeast<string, 2> // [string, string, ...string[]]
 */
export type AtLeast<T, N extends number> = [...Tuple<T, N>, ...T[]];
