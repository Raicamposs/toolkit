/**
 * Creates a factory function for a type with sensible defaults.
 * The returned function accepts partial overrides, merging them with the defaults.
 * Useful for test data factories and builder utilities.
 *
 * @example
 * const makeUser = createFactory({ id: '1', name: 'Ana', role: 'user' as const })
 *
 * makeUser()                    // { id: '1', name: 'Ana', role: 'user' }
 * makeUser({ name: 'Carlos' })  // { id: '1', name: 'Carlos', role: 'user' }
 * makeUser({ role: 'admin' })   // { id: '1', name: 'Ana', role: 'admin' }
 */
export function createFactory<T extends object>(defaults: T): (overrides?: Partial<T>) => T {
  return (overrides?: Partial<T>): T => ({ ...defaults, ...overrides });
}
