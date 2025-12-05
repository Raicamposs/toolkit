
export const roundABNT = (
  value: number | string,
  fractionDigits?: number,
): number => {
  if (value === undefined) return Number.NaN
  if (value === null) return Number.NaN
  if (value.toString().trim().length === 0) return Number.NaN
  if (isNaN(Number(value))) return Number.NaN

  value = Number(value)

  if (fractionDigits === undefined) {
    return value
  }

  if (fractionDigits < 0) {
    throw new Error(
      'fractionDigits must be greater than or equal to zero',
    )
  }

  let [, decimal = ''] = value.toString().split('.')

  if (decimal.length <= fractionDigits) {
    return value
  }

  decimal = decimal.padEnd(fractionDigits + 2, '0')

  const posDigit = decimal.slice(fractionDigits, fractionDigits + 1)
  const digits = Math.pow(10, fractionDigits ?? 1)
  const decimalRest = decimal.slice(fractionDigits + 1).split('')
  const lastFractionDigits = decimal.slice(fractionDigits - 1, fractionDigits)

  const isLessThan5 = Number(posDigit) < 5
  const isGranThan5 = Number(posDigit) > 5
  const isEqual5 = Number(posDigit) === 5
  const isDecimalRestGranThan0 = decimalRest.some((digit) => Number(digit) > 0)
  const isEqual5AndRestGranThan0 = isEqual5 && isDecimalRestGranThan0
  const isEqual5AndRestEqual0 = isEqual5 && !isDecimalRestGranThan0
  const lastFractionDigitsIsEven = Number(lastFractionDigits) % 2 === 0
  const lastRemovedIsEven = Number(decimalRest[0]) % 2 === 0

  // Quando o algarismo imediatamente seguinte ao último algarismo a ser conservado
  // for inferior a 5, o último algarismo a ser conservado permanecerá sem modificação.
  // Exemplo: 1,333 3 arredondado à primeira decimal temos: 1,3.
  if (isLessThan5) {
    return Math.trunc(value * digits) / digits
  }

  // Quando o algarismo imediatamente seguinte ao último algarismo a ser conservado for superior a 5,
  // ou, sendo 5, for seguido de no mínimo um algarismo diferente de zero,
  // o último algarismo a ser conservado deverá ser aumentado de uma unidade.
  // Exemplo A: 1,666 6 arredondado à primeira decimal temos: 1,7.
  // Exemplo B: 4,8501 5 arredondados à primeira decimal temos: 4,9
  if (isGranThan5 || isEqual5AndRestGranThan0) {
    return Math.round(value * digits) / digits
  }

  // Quando o algarismo imediatamente seguinte ao último algarismo a ser conservado for 5 seguido de zeros,
  // dever-se-á arredondar o algarismo a ser conservado para o algarismo par mais próximo.
  // Consequentemente, o último a ser retirado, se for ímpar, aumentará uma unidade.
  // Exemplo: 4,550 0 arredondados à primeira decimal temos: 4,6
  if (isEqual5AndRestEqual0 && !lastRemovedIsEven) {
    return Math.round(value * digits) / digits
  }

  // Quando o algarismo imediatamente seguinte ao último a ser conservado for 5 seguido de zeros,
  // se for par o algarismo a ser conservado, ele permanecerá sem modificação.
  // Exemplo: 4,850 0 arredondados à primeira decimal temos: 4,8
  if (isEqual5AndRestEqual0 && lastFractionDigitsIsEven) {
    return Math.trunc(value * digits) / digits
  }

  return Math.round(value * digits) / digits
}
