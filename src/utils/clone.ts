import { ObjectKeys } from "../types";

/**
 * Creates a deep copy of the given object using JSON serialization.
 * 
 * @template T The type of the object to clone
 * @param obj The object to be cloned
 * @returns A deep copy of the input object
 */
export const clone = <T>(obj: T): T => {

  if (obj === null || obj === undefined) {
    return obj
  }

  if ('object' !== typeof obj) {
    return obj
  }


  let copy: any

  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i])
    }
    return copy
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {}

    ObjectKeys(obj).forEach((attr) => {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = clone(obj[attr])
      }
    })

    return copy
  }

  return obj
}