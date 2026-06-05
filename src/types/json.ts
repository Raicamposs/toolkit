/**
 * JSON-safe primitive types.
 */
export type JsonPrimitive = string | number | boolean | null;

/**
 * A JSON array (recursive).
 */
export type JsonArray = JsonValue[];

/**
 * A JSON object (recursive).
 */
export type JsonObject = { [key: string]: JsonValue };

/**
 * Any value that can be safely serialized to JSON.
 */
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

/**
 * Transforms a type `T` to its JSON-serializable representation.
 * Functions, symbols, and `undefined` values become `never`.
 * Types with a `toJSON()` method resolve to its return type.
 *
 * @example
 * type Serialized = Jsonify<{ id: number; createdAt: Date; fn: () => void }>
 * // { id: number; createdAt: string; fn: never }
 */
export type Jsonify<T> = T extends JsonPrimitive
  ? T
  : T extends undefined | ((...args: unknown[]) => unknown) | symbol
    ? never
    : T extends { toJSON(): infer R }
      ? R
      : T extends object
        ? { [K in keyof T]: Jsonify<T[K]> }
        : never;
