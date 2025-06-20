import { coalesce } from "../utils"

export class Phone {
  static regex = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
  private _value: string

  constructor(value: string) {
    const data = coalesce(value, '').toString()
    this._value = data.replace(/[^0-9]/gi, '')
  }

  get value(): string {
    const phone = coalesce(this._value, '').replace(/\D/g, '')

    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d+)/, '($1)$2-$3')
    }
    return phone.replace(/(\d{2})(\d{5})(\d+)/, '($1)$2-$3')
  }

  get numbersOnly(): string {
    return this._value
  }

  toString(): string {
    return this.value
  }

  get isValid(): boolean {
    return [
      Phone.regex.test(this._value)
    ].every(Boolean)
  }

  static random(): Phone {
    // Escolhe um DDD aleatório
    const ddd = DDD[Math.floor(Math.random() * DDD.length)]

    // Gera um número de 7 dígitos
    const number = Math.floor(1000000 + Math.random() * 9000000)

    const data = [`${ddd}99${number}`, `${ddd}3${number}`][
      Math.floor(Math.random() * 2)
    ]
    const phone = new Phone(data)
    if (phone.isValid) {
      return phone
    }

    return Phone.random()
  }
}

const DDD = [
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '22',
  '24',
  '27',
  '28',
  '31',
  '32',
  '33',
  '34',
  '35',
  '37',
  '38',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '51',
  '53',
  '54',
  '55',
  '61',
  '62',
  '63',
  '64',
  '65',
  '66',
  '67',
  '68',
  '69',
  '71',
  '73',
  '74',
  '75',
  '77',
  '79',
  '81',
  '82',
  '83',
  '84',
  '85',
  '86',
  '87',
  '88',
  '89',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
]
