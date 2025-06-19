import { Nullable } from "../types";

/**
 * Checks whether a value is null or undefined.
 * @param {any} value Value to be checked.
 * @returns {boolean} Whether the value is null or undefined.
 */
export const isNullOrUndefined = <T>(value: Nullable<T>): value is null | undefined => {
  return value === undefined || value === null
}