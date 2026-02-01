import { isAssigned } from '../validation/is-assigned';
import { isNullOrUndefined } from '../validation/is-null-or-undefined';

/**
 * Checks if any property of an object is assigned (not undefined or null).
 * @param object The object to check.
 * @returns True if any property is assigned, false otherwise.
 */
export const hasSomePropertyAssigned = (object: unknown) => {
  if (isNullOrUndefined(object)) return false;

  if (object instanceof Object) {
    return Object.values(object).some((value) => isAssigned(value));
  }

  return isAssigned(object);
};
