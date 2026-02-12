import { isObject } from '../validation/is-object';

/**
 * Deeply merges two objects.
 *
 * @param target - The target object
 * @param source - The source object
 * @returns The merged object
 */
export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
  const output = { ...target } as any;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const k = key as keyof U;
      if (isObject(source[k])) {
        if (!(k in target)) {
          Object.assign(output, { [k]: source[k] });
        } else {

          // @ts-ignore
          output[k] = deepMerge(target[k as keyof T], source[k]);
        }
      } else {
        Object.assign(output, { [k]: source[k] });
      }
    });
  }

  return output;
}


