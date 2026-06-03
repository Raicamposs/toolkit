/**
 * Merges two types, with properties from `U` overriding those from `T`.
 * Unlike `T & U`, conflicting keys resolve to `U`'s type.
 *
 * @example
 * type Base = { id: number; name: string; createdAt: Date }
 * type Override = { createdAt: string }
 * type Merged = Merge<Base, Override>
 * // { id: number; name: string; createdAt: string }
 */
export type Merge<T, U> = Omit<T, keyof U> & U
