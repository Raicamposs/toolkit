import { Nullable } from "../types"

/**
 * Coalesces a nullable value, returning the default value if the input is null or undefined.
 * 
 * @template T The type of the value being coalesced
 * @param value The potentially nullable value to check
 * @param defaultValue The value to return if the input is null or undefined
 * @returns The original value if it is not null or undefined, otherwise the default value
 */
export const coalesce = <T>(value: Nullable<T>, defaultValue: T): T => {
  if (value === undefined) return defaultValue
  if (value === null) return defaultValue
  return value
}
