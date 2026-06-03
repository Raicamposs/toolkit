import { isEmpty, isNullOrUndefined } from '../utils';

export class Email {
  private readonly _value: string;
  static readonly REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(value: string) {
    if (isEmpty(value?.trim())) {
      throw Error('Email cannot be empty');
    }

    if (!value.match(Email.REGEX) || value.length > 254 || value.length < 3) {
      throw Error('Invalid email');
    }

    this._value = value.toLowerCase();
  }

  get value(): string {
    return this._value;
  }

  get username(): string {
    return this._value.split('@')[0] as string;
  }

  get domain(): string {
    return this._value.split('@')[1] as string;
  }

  get isValid(): boolean {
    return Email.check(this._value);
  }

  static random(): Email {
    const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;
    return new Email(randomEmail);
  }

  static check(value: string | null | undefined): boolean {
    if (isNullOrUndefined(value) || isEmpty(value)) return false;
    return Email.REGEX.test(value);
  }

  static fromString(text: string | null | undefined): Email[] {
    if (isNullOrUndefined(text) || isEmpty(text)) return [];
    return text
      .split(';')
      .map((part) => part.trim())
      .filter((part) => Email.check(part))
      .map((part) => new Email(part));
  }
}
