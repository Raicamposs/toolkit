/**
 * Represents a successful or failed operation without using exceptions.
 *
 * @example
 * function divide(a: number, b: number): Result<number, string> {
 *   if (b === 0) return err('Division by zero')
 *   return ok(a / b)
 * }
 *
 * const result = divide(10, 2)
 * if (result.success) {
 *   console.log(result.data) // 5
 * } else {
 *   console.error(result.error)
 * }
 */
export type Result<T, E = Error> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

export const ok = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
});

export const err = <E>(error: E): Result<never, E> => ({
  success: false,
  error,
});
