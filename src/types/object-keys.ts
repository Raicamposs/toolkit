/**
 * Retrieves the keys of an object as an array with proper type inference.
 * 
 * @template Obj The type of the input object
 * @param obj The object to extract keys from
 * @returns An array of keys from the input object with correct type
 */
export const ObjectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] =>
  Object.keys(obj) as (keyof Obj)[]
