/**
 * Extracts the element type from an array type.
 *
 * @example
 * type Numbers = number[]
 * type Num = ElementOf<Numbers> // number
 *
 * type Users = Array<{ id: string; name: string }>
 * type User = ElementOf<Users> // { id: string; name: string }
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never
