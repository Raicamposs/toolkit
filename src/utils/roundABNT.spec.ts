import { roundABNT } from './roundABNT'

import { describe, expect, it } from 'vitest'
describe('RoundNumber', () => {
  it('Quando o algarismo imediatamente seguinte ao último algarismo a ser conservado for inferior a 5, o último algarismo a ser conservado permanecerá sem modificação', () => {
    expect(roundABNT(1.333, 1)).toBe(1.3)
  })

  it(`Quando o algarismo imediatamente seguinte ao último algarismo a ser conservado for superior a 5, ou, sendo 5, for seguido de no mínimo um algarismo diferente de  zero, o último algarismo a ser conservado deverá ser aumentado de uma unidade`, () => {
    expect(roundABNT(1.666, 1)).toBe(1.7)
    expect(roundABNT(4.8501, 1)).toBe(4.9)
  })

  it(' Quando o algarismo imediatamente seguinte ao último algarismo a ser conservado  for 5 seguido de zeros, dever-se-á arredondar o algarismo a ser conservado para o  algarismo par mais próximo. Consequentemente, o último a ser retirado, se for  ímpar, aumentará uma unidade', () => {
    expect(roundABNT(4.55, 1)).toBe(4.6)
  })

  it(' Quando o algarismo imediatamente seguinte ao último a ser conservado for 5 seguido de zeros, se for par o algarismo a ser conservado, ele permanecerá sem modificação', () => {
    expect(roundABNT(4.85, 1)).toBe(4.8)
  })

  it('should round to up', () => {
    expect(roundABNT(0.444, 2)).toBe(0.44)
    expect(roundABNT(0.41, 1)).toBe(0.4)
    expect(roundABNT('0.41', 1)).toBe(0.4)
  })

  it('should round to down', () => {
    expect(roundABNT(0.446, 2)).toBe(0.45)
    expect(roundABNT(0.49, 1)).toBe(0.5)
    expect(roundABNT('0.49', 1)).toBe(0.5)
  })

  it('should round to down', () => {
    expect(roundABNT(0.445, 2)).toBe(0.44)
    expect(roundABNT(0.45, 1)).toBe(0.4)
    expect(roundABNT('0.45', 1)).toBe(0.4)
  })

  it('should round not change value', () => {
    expect(roundABNT(1, 2)).toBe(1)
    expect(roundABNT(150, 3)).toBe(150)
    expect(roundABNT(1000, 3)).toBe(1000)

    expect(roundABNT(589.68, 2)).toBe(589.68)
    expect(roundABNT(589.68, 3)).toBe(589.68)

    expect(roundABNT(10, 3)).toBe(10)
  })

  it('should return Nan', () => {
    expect(roundABNT(null as any, 2)).toBeNaN()
    expect(roundABNT(undefined as any, 3)).toBeNaN()
    expect(roundABNT('', 2)).toBeNaN()
    expect(roundABNT('    ', 3)).toBeNaN()
    expect(roundABNT('fdgmodfgklfdgdfn', 3)).toBeNaN()
  })

  it('should round like ABNT 5891', () => {
    expect(roundABNT(0.342, 2)).toBe(0.34)
    expect(roundABNT(0.346, 2)).toBe(0.35)
    expect(roundABNT(0.3452, 2)).toBe(0.35)
    expect(roundABNT(0.345, 2)).toBe(0.34)
    expect(roundABNT(0.332, 2)).toBe(0.33)
    expect(roundABNT(0.336, 2)).toBe(0.34)
    expect(roundABNT(0.3352, 2)).toBe(0.34)
    expect(roundABNT(0.335, 2)).toBe(0.34)
    expect(roundABNT(0.305, 2)).toBe(0.3)
    expect(roundABNT(0.315, 2)).toBe(0.32)

    expect(roundABNT(1.333, 1)).toBe(1.3)
    expect(roundABNT(1.666, 1)).toBe(1.7)
    expect(roundABNT(4.8501, 1)).toBe(4.9)
    expect(roundABNT(4.55, 1)).toBe(4.6)
    expect(roundABNT(4.85, 1)).toBe(4.8)
  })
})
