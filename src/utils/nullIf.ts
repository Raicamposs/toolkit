import { Nullable } from "../types/nullable"


/**
 * Returns null if the value matches the specified null value, otherwise returns the original value.
 * 
 * @template T The type of the value being checked
 * @param value The input value to potentially nullify
 * @param nullValue The value that, if matched, will cause the function to return null
 * @returns The original value or null if it matches the nullValue
 */
export const nullIf = <T>(value: Nullable<T>, nullValue: T): Nullable<T> => {
  if (value === nullValue) return null
  return value
}
