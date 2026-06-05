/**
 * Multiplicadores base em milissegundos para cada unidade de tempo.
 * Usados internamente para conversão e como fonte única da verdade.
 */
const MS = {
  second: 1_000,
  minute: 60 * 1_000,
  hour: 60 * 60 * 1_000,
  day: 24 * 60 * 60 * 1_000,
  week: 7 * 24 * 60 * 60 * 1_000,
  month: 30 * 24 * 60 * 60 * 1_000,
  year: 365 * 24 * 60 * 60 * 1_000,
} as const;

type Unit = keyof typeof MS;

/**
 * Objeto com uma única chave de unidade de tempo e seu valor numérico.
 *
 * @example
 * const ttl: TtlObjectInput = { hour: 2 }
 */
type TtlObjectInput = { [K in Unit]?: number };

/**
 * Qualquer forma válida de expressar um TTL (Time To Live):
 * - `Ttl` — instância da própria classe
 * - `TtlObjectInput` — objeto com unidade, ex: `{ hour: 2 }`
 * - `null | undefined` — ausência de TTL (será resolvido como `undefined`)
 */
export type TtlInput = Ttl | TtlObjectInput | null | undefined;

/**
 * Representa um intervalo de tempo imutável (Time To Live).
 *
 * Oferece factory methods semânticos, operações de composição e
 * utilitários para uso em cache, autenticação, agendamentos, etc.
 *
 * @example
 * // Criação
 * const ttl = Ttl.hours(2)
 * const ttl = Ttl.of(7_200_000)
 * const ttl = Ttl.resolve({ hour: 2 })
 *
 * // Composição
 * const ttl = Ttl.hours(1).add(Ttl.minutes(30)) // 1h30
 * const ttl = Ttl.days(1).scale(7)              // 1 semana
 *
 * // Uso em cache
 * cache.set(key, value, Ttl.minutes(10).ms)
 *
 * // Expiração
 * if (ttl.isExpired(createdAt)) { ... }
 */
export class Ttl {
  private constructor(
    /** Duração em milissegundos. */
    public readonly ms: number
  ) {}

  // ---------------------------------------------------------------------------
  // Factory methods
  // ---------------------------------------------------------------------------

  /**
   * Cria um `Ttl` a partir de um valor direto em milissegundos.
   *
   * @example
   * Ttl.of(5_000) // 5 segundos
   */
  static of(ms: number): Ttl {
    return new Ttl(ms);
  }

  /** @example Ttl.seconds(30) // 30 segundos */
  static seconds(n: number): Ttl {
    return new Ttl(n * MS.second);
  }

  /** @example Ttl.minutes(10) // 10 minutos */
  static minutes(n: number): Ttl {
    return new Ttl(n * MS.minute);
  }

  /** @example Ttl.hours(2) // 2 horas */
  static hours(n: number): Ttl {
    return new Ttl(n * MS.hour);
  }

  /** @example Ttl.days(7) // 7 dias */
  static days(n: number): Ttl {
    return new Ttl(n * MS.day);
  }

  /** @example Ttl.weeks(2) // 2 semanas */
  static weeks(n: number): Ttl {
    return new Ttl(n * MS.week);
  }

  /** @example Ttl.months(3) // 3 meses (aproximado: 30 dias cada) */
  static months(n: number): Ttl {
    return new Ttl(n * MS.month);
  }

  /** @example Ttl.years(1) // 1 ano (aproximado: 365 dias) */
  static years(n: number): Ttl {
    return new Ttl(n * MS.year);
  }

  // ---------------------------------------------------------------------------
  // Aliases (Convenience)
  // ---------------------------------------------------------------------------

  /** @alias Ttl.seconds */
  static second = Ttl.seconds;
  /** @alias Ttl.minutes */
  static minute = Ttl.minutes;
  /** @alias Ttl.hours */
  static hour = Ttl.hours;
  /** @alias Ttl.days */
  static day = Ttl.days;
  /** @alias Ttl.weeks */
  static week = Ttl.weeks;

  // ---------------------------------------------------------------------------
  // Getters de conversão
  // ---------------------------------------------------------------------------

  /** Duração em segundos. */
  get seconds(): number {
    return this.ms / MS.second;
  }

  /** Duração em minutos. */
  get minutes(): number {
    return this.ms / MS.minute;
  }

  /** Duração em horas. */
  get hours(): number {
    return this.ms / MS.hour;
  }

  /** Duração em dias. */
  get days(): number {
    return this.ms / MS.day;
  }

  // ---------------------------------------------------------------------------
  // Operações
  // ---------------------------------------------------------------------------

  /**
   * Retorna um novo `Ttl` com a soma das duas durações.
   *
   * @example
   * Ttl.hours(1).add(Ttl.minutes(30)) // 1h30
   * Ttl.days(1).add({ hour: 6 })      // 30 horas
   */
  add(other: TtlInput): Ttl {
    return new Ttl(this.ms + (Ttl.fromMs(other) ?? 0));
  }

  /**
   * Retorna um novo `Ttl` com a duração multiplicada pelo fator dado.
   *
   * @example
   * Ttl.hours(1).scale(0.5) // 30 minutos
   * Ttl.days(1).scale(7)    // 1 semana
   */
  scale(factor: number): Ttl {
    return new Ttl(this.ms * factor);
  }

  /**
   * Retorna `true` se o tempo decorrido desde `since` já ultrapassou este TTL.
   *
   * @param since - Timestamp de início em milissegundos (ex: `Date.now()`).
   *
   * @example
   * const createdAt = Date.now() - 10_000
   * Ttl.seconds(5).isExpired(createdAt) // true
   */
  isExpired(since: number): boolean {
    return Date.now() >= since + this.ms;
  }

  /**
   * Retorna a data de expiração a partir de um instante de referência.
   *
   * @param since - Timestamp de início em milissegundos. Padrão: `Date.now()`.
   *
   * @example
   * Ttl.days(7).expiresAt()           // daqui a 7 dias
   * Ttl.hours(1).expiresAt(createdAt) // 1h após createdAt
   */
  expiresAt(since = Date.now()): Date {
    return new Date(since + this.ms);
  }

  // ---------------------------------------------------------------------------
  // Utilitários
  // ---------------------------------------------------------------------------

  /**
   * Representação legível da duração, usando a maior unidade inteira aplicável.
   *
   * @example
   * Ttl.seconds(45).toString()  // "45s"
   * Ttl.minutes(90).toString()  // "90m"
   * Ttl.hours(48).toString()    // "48h"
   * Ttl.days(3).toString()      // "3d"
   */
  toString(): string {
    if (this.ms < MS.minute) return `${this.seconds}s`;
    if (this.ms < MS.hour) return `${this.minutes}m`;
    if (this.ms < MS.day) return `${this.hours}h`;
    return `${this.days}d`;
  }

  // ---------------------------------------------------------------------------
  // Static helpers
  // ---------------------------------------------------------------------------

  /**
   * Resolve qualquer `TtlInput` para um valor em milissegundos.
   * Retorna `undefined` para entradas nulas ou não reconhecidas.
   *
   * @example
   * Ttl.fromMs(5000)          // 5000
   * Ttl.fromMs(Ttl.hours(1))  // 3_600_000
   * Ttl.fromMs({ minute: 5 }) // 300_000
   * Ttl.fromMs(undefined)     // undefined
   */
  static fromMs(ttl?: TtlInput): number | undefined {
    if (ttl == null) return undefined;
    if (typeof ttl === 'number') return ttl;
    if (ttl instanceof Ttl) return ttl.ms;

    let totalMs = 0;
    let found = false;

    for (const unit of Object.keys(MS) as Unit[]) {
      const value = (ttl as TtlObjectInput)[unit];
      if (value !== undefined) {
        totalMs += value * MS[unit];
        found = true;
      }
    }

    return found ? totalMs : undefined;
  }

  /**
   * Resolve qualquer `TtlInput` para uma instância de `Ttl`.
   * Útil quando é preciso encadear operações após receber um input externo.
   * Retorna `undefined` para entradas nulas ou não reconhecidas.
   *
   * @example
   * Ttl.resolve({ day: 1 })?.add(Ttl.hours(6)) // 30 horas
   * Ttl.resolve(undefined)                      // undefined
   */
  static resolve(ttl?: TtlInput): Ttl | undefined {
    const ms = Ttl.fromMs(ttl);
    return ms !== undefined ? new Ttl(ms) : undefined;
  }
}
