import { Nullable } from "../types"

export class CPF {
  private _value: string
  static regex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/

  constructor(value: Nullable<string | number>) {
    const data = (value ?? '').toString()
    this._value = data.replace(/[^0-9]/gi, '')
  }

  get value(): string {
    return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4')
  }

  get numbersOnly(): string {
    return this._value
  }

  get isValid(): boolean {
    return [
      CPF.regex.test(this._value),
      CPF.check(this._value),
    ].every(Boolean)
  }


  get masked(): string {
    return this._value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.***.***-$4')
  }

  static random(): CPF {
    const create_array = (total: number, numero: number) =>
      Array.from(Array(total), () => number_random(numero))
    const number_random = (number: number) => Math.round(Math.random() * number)
    const mod = (dividendo: number, divisor: number) =>
      Math.round(dividendo - Math.floor(dividendo / divisor) * divisor)

    const total_array = 9
    const n = 9
    const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(total_array, n)

    let d1 =
      n9 * 2 +
      n8 * 3 +
      n7 * 4 +
      n6 * 5 +
      n5 * 6 +
      n4 * 7 +
      n3 * 8 +
      n2 * 9 +
      n1 * 10
    d1 = 11 - mod(d1, 11)
    if (d1 >= 10) d1 = 0

    let d2 =
      d1 * 2 +
      n9 * 3 +
      n8 * 4 +
      n7 * 5 +
      n6 * 6 +
      n5 * 7 +
      n4 * 8 +
      n3 * 9 +
      n2 * 10 +
      n1 * 11
    d2 = 11 - mod(d2, 11)
    if (d2 >= 10) d2 = 0

    return new CPF(`${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`)
  }

  static check(value: string | number | undefined): boolean {
    if (!value) return false

    // Aceita receber o valor como string ou número com todos os dígitos
    const validTypes = typeof value === 'string' || Number.isInteger(value)

    // Elimina valores com formato inválido
    if (!validTypes) return false

    const numbers = value
      .toString()
      .replace(/[^0-9]/gi, '')
      .split('')
      .map(Number)

    if (numbers.length !== 11) return false
    if (new Set(numbers).size === 1) return false

    // Separa número base do dígito verificador
    const base = numbers.slice(0, 9)
    const digits = numbers.slice(9)

    // Cálculo base
    const calc = (n: number, i: number, x: number): number => n * (x - i)

    // Utilitário de soma
    const sum = (r: number, n: number): number => r + n

    // Cálculo de dígito verificador
    const digit = (n: number): number => {
      const rest = n % numbers.length
      return rest < 2 ? 0 : numbers.length - rest
    }

    // Cálculo sobre o número base
    const calc0 = base
      .map((n, i) => calc(n, i, numbers.length - 1))
      .reduce(sum, 0)
    // 1o. dígito verificador
    const digit0 = digit(calc0)

    // Valida 1o. digito verificador
    if (digit0 !== digits[0]) return false

    // Cálculo sobre o número base + 1o. dígito verificador
    const calc1 = base
      .concat(digit0)
      .map((n, i) => calc(n, i, numbers.length))
      .reduce(sum, 0)
    // 2o. dígito verificador
    const digit1 = digit(calc1)

    // Valida 2o. dígito verificador
    return digit1 === digits[1]
  }
}
