import { Nullable } from '../types';

export class CPF {
  private readonly _value: string;

  private static readonly CPF_LENGTH = 11;
  private static readonly CPF_REGEX = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
  private static readonly REPEATED_DIGITS_REGEX = /^(\d)\1+$/;

  constructor(value: Nullable<string | number>) {
    const data = (value ?? '').toString();
    this._value = CPF.stripNonDigits(data);
  }

  get value(): string {
    return this.format(this._value);
  }

  get numbersOnly(): string {
    return this._value;
  }

  get isValid(): boolean {
    return CPF.check(this._value);
  }

  get masked(): string {
    return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.***.***-$4');
  }

  static random(): CPF {
    const randomDigit = () => Math.floor(Math.random() * 9);
    const digits = Array.from({ length: 9 }, randomDigit);

    const digit1 = CPF.calculateDigit(digits);
    const digit2 = CPF.calculateDigit([...digits, digit1]);

    const generatedCPF = [...digits, digit1, digit2].join('');
    return new CPF(generatedCPF);
  }

  static check(value: string | number | undefined | null): boolean {
    if (value === undefined || value === null) return false;

    const stringValue = value.toString();
    const cleanValue = CPF.stripNonDigits(stringValue);

    if (cleanValue.length !== CPF.CPF_LENGTH) return false;
    if (CPF.REPEATED_DIGITS_REGEX.test(cleanValue)) return false;

    const digits = cleanValue.split('').map(Number);
    const baseDigits = digits.slice(0, 9);
    const verifierDigits = digits.slice(9);

    const digit1 = CPF.calculateDigit(baseDigits);
    if (digit1 !== verifierDigits[0]) return false;

    const digit2 = CPF.calculateDigit([...baseDigits, digit1]);
    return digit2 === verifierDigits[1];
  }

  private static stripNonDigits(value: string): string {
    return value.replace(/\D/g, '');
  }

  private format(value: string): string {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private static calculateDigit(digits: number[]): number {
    const factor = digits.length + 1;
    const sum = digits.reduce((acc, digit, index) => acc + digit * (factor - index), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
}
