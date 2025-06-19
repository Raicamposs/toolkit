import { Nullable } from "../types";

/**
 * Checks whether a value is null.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null.
 */
export function isNull<T>(value: Nullable<T>): value is null {
  return value === null
}