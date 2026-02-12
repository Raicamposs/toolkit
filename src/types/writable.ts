/**
 * Removes the 'readonly' modifier from all properties of T.
 */
export type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};
