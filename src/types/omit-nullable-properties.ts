/**
 * @description
 * Omit nullable properties from a type
 * @template T
 * @param {T} T
 * @returns {T}
 * @example
 * type T = OmitNullableProperties<{ a: 1; b: 2 }>
 * // T = { a: 1; b: 2 }
 */
export type OmitNullableProperties<T> = {
  [K in keyof T as Exclude<
    K,
    {
      [P in keyof T]: null extends T[P] ? P : never;
    }[keyof T]
  >]: T[K] extends infer U | null ? U : T[K];
};
