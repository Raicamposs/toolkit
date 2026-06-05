import { Nullable } from '../types';

export abstract class ZeroIdToNull {
  static execute(value: Nullable<number | string>): number | null {
    if (value === null || value === undefined) {
      return null;
    }

    if (isNaN(+value)) {
      return null;
    }

    if (Number(value) <= 0) {
      return null;
    }

    return Number(value);
  }
}
