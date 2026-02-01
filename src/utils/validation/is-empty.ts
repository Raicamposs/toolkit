/**
 * Checks if a value is empty or null/undefined.
 *
 * @param value - The value to check for emptiness
 * @returns True if the value is null, undefined, or contains only whitespace or is an empty array; otherwise false
 */
export function isEmpty(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size === 0;
  }

  if (value instanceof Object) {
    return Object.keys(value).length === 0;
  }

  return false;
}
