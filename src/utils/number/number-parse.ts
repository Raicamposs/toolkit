import { Nullable } from '../../types/nullable';
import { isNullOrUndefined } from '../validation';

export const numberParse = (value: Nullable<number | string>): Nullable<number> => {
  if (isNullOrUndefined(value)) return value;
  if (
    typeof value === 'object' &&
    'toNumber' in (value as any) &&
    typeof (value as any).toNumber === 'function'
  ) {
    try {
      return (value as any).toNumber();
    } catch (e) {
      return Number.NaN;
    }
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
};
export const numberParseDef = (
  value: Nullable<number | string>,
  defaultValue = 0
): Nullable<number> => {
  if (isNullOrUndefined(value)) {
    return defaultValue;
  }

  if (
    typeof value === 'object' &&
    'toNumber' in (value as any) &&
    typeof (value as any).toNumber === 'function'
  ) {
    try {
      return (value as any).toNumber();
    } catch (e) {
      return defaultValue;
    }
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return defaultValue;
  return parsed;
};
