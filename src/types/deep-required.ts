/**
 * Recursively makes all properties of an object required (removes `?` modifier).
 *
 * @example
 * type Config = { host?: { port?: number } }
 * type RequiredConfig = DeepRequired<Config>
 * // { host: { port: number } }
 */
export type DeepRequired<T> = T extends object ? { [K in keyof T]-?: DeepRequired<T[K]> } : T;
