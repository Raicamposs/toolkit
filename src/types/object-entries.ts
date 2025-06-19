
/**
 * Converts an object into an array of key-value pairs.
 * 
 * @template Obj The type of the input object
 * @param obj The object to convert to entries
 * @returns An array of tuples containing the object's keys and corresponding values
 */
export const ObjectEntries = <Obj extends { [s: string]: any }>(obj: Obj): [keyof Obj, any][] =>
  Object.entries(obj) as [keyof Obj, any][]