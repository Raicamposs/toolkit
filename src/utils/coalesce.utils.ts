import { Nullable } from "../types"

export const coalesce = <T>(value: Nullable<T>, defaultValue: T): T => {
  if (value === undefined) return defaultValue
  if (value === null) return defaultValue
  return value
}
