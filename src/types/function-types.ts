/**
 * Extracts the argument types of a function as a tuple.
 *
 * @example
 * type Fn = (a: string, b: number) => void
 * type Args = Arguments<Fn> // [string, number]
 */
export type Arguments<T> = T extends (...args: infer A) => unknown ? A : never;

/**
 * Extracts the type of the first argument of a function.
 *
 * @example
 * type Fn = (id: string, fallback: number) => void
 * type First = FirstArgument<Fn> // string
 */
export type FirstArgument<T> = T extends (first: infer F, ...args: unknown[]) => unknown
  ? F
  : never;

/**
 * Wraps a function's return type in `Promise`, preserving its signature.
 *
 * @example
 * type Sync = (id: string) => User
 * type Async = AsyncFunction<Sync> // (id: string) => Promise<User>
 */
export type AsyncFunction<T extends (...args: unknown[]) => unknown> = (
  ...args: Parameters<T>
) => Promise<Awaited<ReturnType<T>>>;

/**
 * Transforms a function type so that its return value is wrapped in `Promise`.
 *
 * @example
 * type Fn = (x: number) => string
 * type Async = Promisify<Fn> // (x: number) => Promise<string>
 */
export type Promisify<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<Awaited<R>>
  : never;
