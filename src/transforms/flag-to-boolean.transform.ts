type FlagSimNao = 'S' | 'N';

export abstract class FlagToBooleanTransform {
  static execute(value: unknown, defaultValue: boolean | undefined = false): boolean | undefined {
    if (value === null || value === undefined) {
      return defaultValue;
    }

    switch (value.toString().trim().toUpperCase()) {
      case 'S':
      case 'SIM':
      case 'TRUE':
      case 'T':
        return true;
      case 'N':
      case 'NÃO':
      case 'NAO':
      case 'FALSE':
      case 'F':
        return false;
      default:
        return defaultValue;
    }
  }
  static reverse(
    value: unknown,
    defaultValue: FlagSimNao | undefined = undefined
  ): FlagSimNao | undefined {
    if (value === null || value === undefined) {
      return defaultValue;
    }

    const sentinel = {} as any;
    const condition = this.execute(value, sentinel);

    if (condition === true) {
      return 'S';
    }

    if (condition === false) {
      return 'N';
    }

    return defaultValue;
  }
}
