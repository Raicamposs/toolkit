import { Nullable } from "../types"
import { coalesce } from "./coalesce.utils"
import { isEmpty } from "./isEmpty"
import { isNullOrUndefined } from "./isNullOrUndefined"


/**
 * `JSONConverter` is a utility class for safely converting objects to JSON strings and parsing JSON strings back into objects.
 * It provides methods to handle null or undefined values, empty strings, and parsing errors, returning default values when necessary.
 */
export class JSONConverter {
  /**
   * Converts an object to a JSON string safely, handling null and undefined values.
   * 
   * @param object - The object to convert to a JSON string
   * @returns The JSON string representation of the object, or null if the input is null or undefined
   */
  static stringify(object: any): string | null {
    if (isNullOrUndefined(object)) {
      return null
    }

    return JSON.stringify(object)
  }

  /**
   * Parses a JSON string safely, handling null, undefined, and empty strings.
   * 
   * @param json - The JSON string to parse
   * @returns The parsed object or undefined if parsing fails or input is invalid
   */
  static parse(json: Nullable<string>): object | undefined {
    if (isNullOrUndefined(json)) {
      return undefined
    }

    if (isEmpty(json?.trim())) {
      return undefined
    }

    try {
      return JSON.parse(json)
    } catch (error) {
      return undefined
    }
  }

  /**
   * Parses a JSON string safely, returning a default value if parsing fails or input is invalid.
   * 
   * @param json - The JSON string to parse
   * @param defaultValue - The default value to return if parsing fails (defaults to an empty object)
   * @returns The parsed object or the specified default value
   */
  static parseWithDefault(
    json: string | null | undefined,
    defaultValue: any = {},
  ): any {
    return coalesce(this.parse(json), defaultValue)
  }

}
