/**
 * Creates a deep copy of the given value using the native structuredClone API.
 *
 * @template T The type of the value to clone
 * @param obj The value to be cloned
 * @returns A deep copy of the input value
 */
export const clone = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  return structuredClone(obj);
};
