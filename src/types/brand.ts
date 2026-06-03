/**
 * Creates a nominal/branded type to prevent primitive obsession.
 * Useful for distinguishing semantically different values with the same underlying type.
 *
 * @example
 * type UserId = Brand<string, 'UserId'>
 * type OrderId = Brand<string, 'OrderId'>
 *
 * declare function getUser(id: UserId): User
 * const orderId = '123' as OrderId
 * getUser(orderId) // ← compile error: OrderId is not UserId
 */
export type Brand<K, T> = K & { readonly __brand: T }
