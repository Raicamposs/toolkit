export type OmitNullableProperties<T> = {
  [K in keyof T as Exclude<
    K,
    {
      [P in keyof T]: null extends T[P] ? P : never
    }[keyof T]
  >]: T[K] extends infer U | null ? U : T[K]
}
