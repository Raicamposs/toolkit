/**
 * @description
 * Require at least one property of T to be present
 * @template T
 * @param {T} T
 * @returns {T}
 * @example
 * type T = RequireAtLeastOne<{ a: 1; b: 2 }>
 * // T = { a: 1; b: 2 }
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];
