/**
 * Throws at runtime if called, and ensures at compile time that all branches
 * of a union are handled. Use in the `default` case of a `switch` or as
 * the final `else` branch of an `if/else if` chain.
 *
 * @example
 * type Shape = 'circle' | 'square'
 *
 * function area(s: Shape) {
 *   switch (s) {
 *     case 'circle': return Math.PI
 *     case 'square': return 1
 *     default: return assertNever(s) // compile error if a case is missing
 *   }
 * }
 */
export function assertNever(value: never, message?: string): never {
  throw new Error(message ?? `Unhandled value: ${JSON.stringify(value)}`);
}

/**
 * Type-level exhaustiveness check that does NOT throw.
 * Use when you want a compile-time guard without a runtime cost.
 *
 * @example
 * type Dir = 'left' | 'right'
 * function handle(d: Dir) {
 *   if (d === 'left') { ... }
 *   else if (d === 'right') { ... }
 *   else exhaustiveCheck(d) // compile error if Dir grows
 * }
 */
export function exhaustiveCheck(_value: never): void {
  // intentionally empty — compile-time guard only
}
