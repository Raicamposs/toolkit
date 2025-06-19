/**
 * Replaces a type with another type.
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Replace<Post, { id: number }>
 * ```
 **/
export type Replace<T, R> = Omit<T, keyof R> & R
