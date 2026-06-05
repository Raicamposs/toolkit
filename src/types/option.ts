/**
 * Represents an explicit optional value: either present (`Some`) or absent (`None`).
 * Prefer this over `null | undefined` in domain logic to make optionality explicit.
 *
 * @example
 * function findUser(id: string): Option<User> {
 *   const user = db.find(id)
 *   return user ? some(user) : none
 * }
 *
 * const result = findUser('123')
 * if (result.type === 'some') {
 *   console.log(result.value)
 * }
 */
export type Some<T> = { readonly type: 'some'; readonly value: T };
export type None = { readonly type: 'none' };
export type Option<T> = Some<T> | None;

export const some = <T>(value: T): Some<T> => ({ type: 'some', value });
export const none: None = { type: 'none' };
