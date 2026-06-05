import { isObject } from '../validation/is-object';

/**
 * Deeply merges two objects.
 *
 * @param target - The target object
 * @param source - The source object
 * @returns The merged object
 */
export function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
  target: T,
  source: U
): T & U {
  const output = { ...target } as T & U;

  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = (target as Record<string, unknown>)[key];

      if (isObject(sourceVal) && isObject(targetVal)) {
        (output as Record<string, unknown>)[key] = deepMerge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>
        );
      } else {
        (output as Record<string, unknown>)[key] = sourceVal;
      }
    }
  }

  return output;
}
