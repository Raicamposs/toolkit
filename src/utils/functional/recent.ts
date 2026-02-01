/**
 * Milliseconds per minute constant
 */
export const MS_PER_MINUTE = 60 * 1000;

/**
 * Generic data-based "recent" spec
 *
 * @template T - Type that extends an object with a Date property
 */
export type Recent<T extends { [K in KDate]: Date }, KDate extends keyof T> = {
  key: KDate;
  minutes: number;
};

/**
 * Creates a specification that checks if a date property is recent
 *
 * @param config - Configuration object with key and minutes
 * @returns A predicate function that checks if the date is within the specified minutes
 *
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   createdAt: Date;
 * }
 *
 * const recentlyCreated = recent<User, 'createdAt'>({
 *   key: 'createdAt',
 *   minutes: 5
 * });
 *
 * const user = { id: 1, name: 'John', createdAt: new Date() };
 * recentlyCreated(user); // true (if created within last 5 minutes)
 * ```
 */
export const recent = <T extends { [K in KDate]: Date }, KDate extends keyof T>(
  config: Recent<T, KDate>
) => {
  return (e: T) => {
    const now = new Date();
    const dateValue = e[config.key] as Date;
    const diffInMs = now.getTime() - dateValue.getTime();
    return diffInMs <= config.minutes * MS_PER_MINUTE;
  };
};
