import { Nullable } from "../types";

/**
 * Checks if a string is empty or null/undefined.
 * 
 * @param str - The string to check for emptiness
 * @returns True if the string is null, undefined, or contains only whitespace; otherwise false
 */
export function isEmpty(str: Nullable<string>): boolean {
  if (str === undefined || str === null) {
    return true;
  }
  return str.trim().length === 0;
}