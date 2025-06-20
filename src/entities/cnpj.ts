import { Nullable } from "../types"
import { isNullOrUndefined } from "../utils"


export class CNPJ {
  static regex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$/
  private _value: string

  constructor(value: Nullable<string | number>) {
    const data = (value ?? '').toString()
    this._value = data.replace(/[^0-9]/gi, '')
  }

  get value(): string {
    return this._value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/,
      '$1.$2.$3/$4-$5',
    )
  }

  get numbersOnly(): string {
    return this._value
  }

  get isValid(): boolean {
    return [
      CNPJ.regex.test(this._value),
      CNPJ.check(this._value),
    ].every(Boolean)
  }

  get masked(): string {
    return this._value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/,
      '$1.***.***/$4-$5',
    )
  }

  static random(): CNPJ {
    const create_array = (total: number, numero: number) =>
      Array.from(Array(total), () => number_random(numero))
    const number_random = (number: number) => Math.round(Math.random() * number)
    const mod = (dividendo: number, divisor: number) =>
      Math.round(dividendo - Math.floor(dividendo / divisor) * divisor)

    const total_array = 8
    const n = 9
    const [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n)
    const n9 = 0
    const n10 = 0
    const n11 = 0
    const n12 = 1

    let d1 =
      n12 * 2 +
      n11 * 3 +
      n10 * 4 +
      n9 * 5 +
      n8 * 6 +
      n7 * 7 +
      n6 * 8 +
      n5 * 9 +
      n4 * 2 +
      n3 * 3 +
      n2 * 4 +
      n1 * 5
    d1 = 11 - mod(d1, 11)
    if (d1 >= 10) d1 = 0

    let d2 =
      d1 * 2 +
      n12 * 3 +
      n11 * 4 +
      n10 * 5 +
      n9 * 6 +
      n8 * 7 +
      n7 * 8 +
      n6 * 9 +
      n5 * 2 +
      n4 * 3 +
      n3 * 4 +
      n2 * 5 +
      n1 * 6
    d2 = 11 - mod(d2, 11)
    if (d2 >= 10) d2 = 0

    return new CNPJ(
      `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`,
    )
  }

  static check(value: string | number | undefined): boolean {
    if (isNullOrUndefined(value)) return false

    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value)

    if (!validTypes) return false

    const numbers = value
      .toString()
      .replace(/[^0-9]/gi, '')
      .split('')
      .map(Number)

    if (numbers.length !== 14) return false
    if (new Set(numbers).size === 1) return false

    // Separa os 2 últimos dígitos de verificadores
    const [firstDigit, secondDigit] = numbers.slice(12)

    // Valida 1o. dígito verificador
    const firstDigitCalculated = CNPJ.calc(numbers, 12)
    if (firstDigitCalculated !== firstDigit) return false

    // Valida 2o. dígito verificador
    const secondDigitCalculated = CNPJ.calc(numbers, 13)
    return secondDigitCalculated === secondDigit
  }

  private static calc(numbers: number[], length: number): number {
    const slice = numbers.slice(0, length)
    let factor = length - 7
    let sum = 0

    for (let i = length; i >= 1; i--) {
      const n = slice[length - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }
}
