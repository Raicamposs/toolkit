import { Nullable } from '../../types/nullable';
import { isNullOrUndefined } from '../validation';

interface Convertible {
  toNumber(): number;
}

function isConvertible(value: unknown): value is Convertible {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toNumber' in value &&
    typeof (value as Convertible).toNumber === 'function'
  );
}

export const numberParse = (value: Nullable<number | string | Convertible>): Nullable<number> => {
  if (isNullOrUndefined(value)) return value;
  if (isConvertible(value)) {
    try {
      return value.toNumber();
    } catch {
      return Number.NaN;
    }
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
};

export const numberParseDef = (
  value: Nullable<number | string | Convertible>,
  defaultValue = 0
): Nullable<number> => {
  if (isNullOrUndefined(value)) {
    return defaultValue;
  }
  if (isConvertible(value)) {
    try {
      return value.toNumber();
    } catch {
      return defaultValue;
    }
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return defaultValue;
  return parsed;
};
