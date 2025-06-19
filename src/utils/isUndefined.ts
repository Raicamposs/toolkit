import { Nullable } from "../types";

/**
 * Checks whether a value is undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is undefined.
 */
export function isUndefined<T>(value: Nullable<T>): value is undefined {
  return value === undefined
}