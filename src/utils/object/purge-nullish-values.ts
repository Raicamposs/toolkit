import { isAssigned } from '../validation/is-assigned';
import { isNullOrUndefined } from '../validation/is-null-or-undefined';

export function purgeNullishValues<T>(obj: T): Partial<T> | undefined {
  if (isNullOrUndefined(obj)) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj.map((item) => purgeNullishValues(item)).filter(isAssigned);

    return cleanedArray as unknown as Partial<T>;
  }

  if (typeof obj === 'object') {
    const cleanedObj = {} as Partial<T>;
    Object.keys(obj as object).forEach((key) => {
      const value = (obj as Record<string, unknown>)[key];
      const cleanedValue = purgeNullishValues(value);

      if (isAssigned(cleanedValue)) {
        (cleanedObj as Record<string, unknown>)[key] = cleanedValue;
      }
    });

    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  }

  return obj as unknown as Partial<T>;
}
