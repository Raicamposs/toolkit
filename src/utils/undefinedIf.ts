import { Nullable } from "../types/nullable"


/**
 * Returns undefined if the value matches the specified undefined value, otherwise returns the original value.
 * 
 * @template T The type of the value being checked
 * @param value The input value to potentially nullify
 * @param checkValue The value that, if matched, will cause the function to return undefined
 * @returns The original value or undefined if it matches the nullValue
 */
export const undefinedIf = <T>(value: Nullable<T>, checkValue: T): Nullable<T> => {
  if (value === checkValue) return undefined
  return value
}
