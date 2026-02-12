/**
 * Checks if the given value is a Plain Old JavaScript Object (POJO).
 * It returns false for arrays, functions, null, or other non-object types.
 *
 * @param item - The value to check
 * @returns True if the value is an object, false otherwise
 */
export function isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}
