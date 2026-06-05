import { Nullable } from '../types';

export abstract class ZeroIdToUndefined {
  static execute(value: Nullable<number | string>): number | undefined {
    if (value === null || value === undefined) {
      return undefined;
    }

    if (isNaN(+value)) {
      return undefined;
    }

    if (Number(value) <= 0) {
      return undefined;
    }

    return Number(value);
  }
}
