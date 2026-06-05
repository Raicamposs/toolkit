/**
 * Makes specific keys of `T` optional, keeping the rest required.
 *
 * @example
 * type User = { id: number; name: string; email: string }
 * type Draft = PartialBy<User, 'id' | 'email'>
 * // { id?: number; name: string; email?: string }
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specific keys of `T` required, keeping the rest as-is.
 *
 * @example
 * type Config = { host?: string; port?: number; timeout?: number }
 * type WithRequiredHost = RequiredBy<Config, 'host'>
 * // { host: string; port?: number; timeout?: number }
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Makes specific keys of `T` readonly, keeping the rest as-is.
 *
 * @example
 * type User = { id: number; name: string }
 * type ImmutableId = ReadonlyBy<User, 'id'>
 * // { readonly id: number; name: string }
 */
export type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
