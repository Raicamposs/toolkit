
/**
 * Creates a literal type from the given string value.
 * 
 * @template T - The string literal type to be created
 * @param value - The string value to be used as a literal type
 * @returns The input value as a literal type
 * @example
 * const myLiteral = literal('hello'); // Type is 'hello'
 */
export const literal = <T extends string>(value: T) => value;