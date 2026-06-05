/**
 * Extracts keys that are required (non-optional) in `T`.
 *
 * @example
 * type User = { id: number; name: string; email?: string }
 * type RK = RequiredKeys<User> // 'id' | 'name'
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Extracts keys that are optional in `T`.
 *
 * @example
 * type User = { id: number; name: string; email?: string }
 * type OK = OptionalKeys<User> // 'email'
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Generates getter method names for each key of `T`.
 * Transforms `{ name: string; age: number }` into `{ getName: () => string; getAge: () => number }`.
 *
 * @example
 * interface Person { name: string; age: number }
 * type PersonGetters = Getters<Person>
 * // { getName: () => string; getAge: () => number }
 */
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
