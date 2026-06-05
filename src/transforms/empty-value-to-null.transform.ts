import { Nullable } from '../types';

export abstract class EmptyValueToNull {
  static execute(value: Nullable<string>): Nullable<string> {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value !== 'string') {
      return value;
    }

    if (value.trim().length === 0) {
      return null;
    }

    return value;
  }
}
