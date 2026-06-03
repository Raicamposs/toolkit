import { Nullable } from '../types';
import { isNullOrUndefined } from '../utils';

export class CNPJ {
  static readonly REGEX = /^[A-Z0-9]{2}\.?[A-Z0-9]{3}\.?[A-Z0-9]{3}\/?[A-Z0-9]{4}\-?\d{2}$/i;
  private readonly _value: string;

  constructor(value: Nullable<string | number>) {
    const data = (value ?? '').toString().toUpperCase();
    this._value = data.replace(/[^A-Z0-9]/g, '');
  }

  get value(): string {
    return this._value.replace(/([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  get stripped(): string {
    return this._value;
  }

  get isValid(): boolean {
    return CNPJ.check(this._value);
  }

  get masked(): string {
    return this._value.replace(/([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})(\d{2})/, '$1.***.***/$4-$5');
  }

  static random(): CNPJ {
    const createArray = (total: number, max: number) =>
      Array.from({ length: total }, () => Math.round(Math.random() * max));

    const baseDigits = createArray(8, 9);
    const numbers = [...baseDigits, 0, 0, 0, 1];

    const d1 = CNPJ.calc(numbers, 12);
    numbers.push(d1);

    const d2 = CNPJ.calc(numbers, 13);
    numbers.push(d2);

    return new CNPJ(numbers.join(''));
  }

  static check(value: string | number | undefined): boolean {
    if (isNullOrUndefined(value)) return false;

    const isString = typeof value === 'string';
    const validTypes = isString || Number.isInteger(value);

    if (!validTypes) return false;

    const strValue = value.toString().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (strValue.length !== 14) return false;
    if (new Set(strValue.split('')).size === 1) return false;

    const numbers = strValue.split('').map(c => c.charCodeAt(0) - 48);

    const [firstDigit, secondDigit] = numbers.slice(12);

    const firstDigitCalculated = CNPJ.calc(numbers, 12);
    if (firstDigitCalculated !== firstDigit) return false;

    const secondDigitCalculated = CNPJ.calc(numbers, 13);
    return secondDigitCalculated === secondDigit;
  }

  private static calc(numbers: number[], length: number): number {
    const slice = numbers.slice(0, length);
    let factor = length - 7;
    let sum = 0;

    for (let i = length; i >= 1; i--) {
      const n = slice[length - i] as number;
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  }
}
