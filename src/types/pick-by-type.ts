/**
 * Gets the keys of `T` whose value type extends `V`.
 *
 * @example
 * type User = { id: number; name: string; active: boolean }
 * type StringKeys = KeysOfType<User, string> // 'name'
 */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * Picks properties from `T` whose value type extends `V`.
 *
 * @example
 * type User = { id: number; name: string; active: boolean }
 * type Strings = PickByType<User, string> // { name: string }
 */
export type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;

/**
 * Omits properties from `T` whose value type extends `V`.
 *
 * @example
 * type User = { id: number; name: string; active: boolean }
 * type NoStrings = OmitByType<User, string> // { id: number; active: boolean }
 */
export type OmitByType<T, V> = Omit<T, KeysOfType<T, V>>;
