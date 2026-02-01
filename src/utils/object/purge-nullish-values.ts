import { isAssigned } from '../validation/is-assigned';
import { isNullOrUndefined } from '../validation/is-null-or-undefined';

export function purgeNullishValues(obj: any): any {
  if (isNullOrUndefined(obj)) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    const cleanedArray = obj.map((item) => purgeNullishValues(item)).filter(isAssigned);

    return cleanedArray;
  }

  if (typeof obj === 'object') {
    const cleanedObj: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      const value = (obj as any)[key];
      const cleanedValue = purgeNullishValues(value);

      if (isAssigned(cleanedValue)) {
        cleanedObj[key] = cleanedValue;
      }
    });

    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  }

  return obj;
}
