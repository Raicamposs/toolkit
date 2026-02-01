import { isNullOrUndefined } from '../validation';

/**
 * Checks if every property of an object is not assigned (undefined or null).
 * @param object The object to check.
 * @returns True if every property is not assigned, false otherwise.
 */
export const hasOnlyUnassignedProperties = (object: unknown) => {
  if (isNullOrUndefined(object)) return true;

  if (object instanceof Object) {
    return Object.values(object).every((value) => isNullOrUndefined(value));
  }

  return isNullOrUndefined(object);
};
