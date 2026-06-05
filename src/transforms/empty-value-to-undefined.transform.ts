import { Nullable } from '../types';

export abstract class EmptyValueToUndefined {
  static execute(value: Nullable<string>): Nullable<string> {
    if (value === null || value === undefined) {
      return undefined;
    }

    if (value.toString().trim().length === 0) {
      return undefined;
    }

    return value;
  }
}
