/**
 * Checks at the type level whether two types are exactly equal.
 * Returns `true` or `false` as a type.
 *
 * @example
 * type Check = AssertEqual<string, string> // true
 * type Fail  = AssertEqual<string, number> // false
 */
export type AssertEqual<T, U> =
  (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;

/**
 * Returns `true` if `T` is `never`, `false` otherwise.
 *
 * @example
 * type A = IsNever<never> // true
 * type B = IsNever<string> // false
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Returns `true` if `T` is `any`, `false` otherwise.
 *
 * @example
 * type A = IsAny<any>    // true
 * type B = IsAny<string> // false
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Returns `true` if `T` is `unknown` (and not `any`), `false` otherwise.
 *
 * @example
 * type A = IsUnknown<unknown> // true
 * type B = IsUnknown<any>     // false
 * type C = IsUnknown<string>  // false
 */
export type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false;
