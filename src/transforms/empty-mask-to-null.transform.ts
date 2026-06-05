import { Nullable } from '../types';

export abstract class EmptyMaskToNull {
  static execute(value: Nullable<string>): Nullable<string> {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value !== 'string') {
      return null;
    }

    const onlyNumbers = value.toString().replace(/\D/gi, '');
    if (onlyNumbers.trim().length === 0) {
      return null;
    }

    return value;
  }
}
