


/**
 * Utility class providing static methods for common string transformations.
 *
 * @remarks
 * This abstract class offers a set of static methods to convert strings between different cases,
 * generate slugs, and perform other string manipulations. All methods are stateless and can be used
 * without instantiating the class.
 *
 * @example
 * ```typescript
 * StringUtils.snakeToCamel('my_snake_case'); // 'mySnakeCase'
 * StringUtils.camelToSnakeCase('myCamelCase'); // 'my_camel_case'
 * StringUtils.toTitleCase('hello world'); // 'Hello World'
 * StringUtils.slugify('Olá, mundo!'); // 'ola-mundo'
 * StringUtils.toCamelCase('hello_world'); // 'helloWorld'
 * ```
 *
 * @public
 */
export abstract class StringUtils {

  /**
     * Converts a string to snake_case format.
     *
     * @param str - The input string to convert to snake case
     * @returns A snake_case version of the input string
     *
     * @example
     * StringUtils.toSnakeCase('helloWorld'); // 'hello_world'
     * StringUtils.toSnakeCase('HelloWorld'); // 'hello_world'
     */
  static toSnakeCase(str: string): string {
    return str
      .replace(/\s+/g, '_') // 1. Substitui espaços por underscores
      .replace(/([A-Z])/g, '_$1') // 2. Adiciona underscore antes de letras maiúsculas
      .replace(/[^a-zA-Z0-9_]+/g, '') // 3. Remove caracteres que não são letras, números ou underscores
      .toLowerCase() // 4. Converte toda a string para minúsculas
      .replace(/^_/, '') // 5. Remove underscore inicial, se houver
      .replace(/_{2,}/g, '_').trim();
  }


  /**
     * Converts a string to kebab-case format.
     *
     * @param str - The input string to convert to kebab case
     * @returns A kebab-case version of the input string
     *
     * @example
     * StringUtils.toKebabCase('helloWorld'); // 'hello-world'
     * StringUtils.toKebabCase('HelloWorld'); // 'hello-world'
     */
  static toKebabCase(str: string): string {
    return str
      .replace(/\s+/g, '-') // 1. Substitui espaços por hífens
      .replace(/([A-Z])/g, '-$1') // 2. Adiciona hífen antes de letras maiúsculas
      .replace(/[^a-zA-Z0-9-]+/g, '') // 3. Remove caracteres que não são letras, números ou hífens
      .toLowerCase() // 4. Converte toda a string para minúsculas
      .replace(/^-/, '') // 5. Remove hífen inicial, se houver
      .replace(/-{2,}/g, '-').trim();
  }


  /**
   * Converts a string to title case, where the first letter of each word is capitalized.
   *
   * @param str - The input string to convert to title case
   * @returns A title case version of the input string, or undefined if the input is empty or null
   *
   * @example
   * StringUtils.toTitleCase('hello world'); // 'Hello World'
   * StringUtils.toTitleCase('UPPERCASE TEXT'); // 'Uppercase Text'
   */
  static toTitleCase(str: string) {

    return str.toLowerCase().replace(/(?:^|\s|-)\w/g, (match) => {
      return match.toUpperCase();
    }).trim();
  }

  /**
   * Converts a string to camel case, where the first word starts with a lowercase letter and subsequent words start with an uppercase letter.
   *
   * @param str - The input string to convert to camel case
   * @returns A camel case version of the input string with spaces and hyphens removed
   *
   * @example
   * StringUtils.toCamelCase('hello world'); // 'helloWorld'
   * StringUtils.toCamelCase('Hello-World'); // 'helloWorld'
   */
  static toCamelCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : '').replace(/^./, (match) => match.toLowerCase()).trim();
  }


  /**
 * Converts a string into a URL-friendly slug.
 *
 * @param text - The input text to be converted into a slug
 * @param separator - Optional custom separator, defaults to hyphen ('-')
 * @returns A normalized, lowercase string with non-alphanumeric characters removed and replaced with the specified separator
 *
 * @example
 * StringUtils.slugify('Hello World!'); // 'hello-world'
 * StringUtils.slugify('Café au Lait', '_'); // 'cafe-au-lait'
 */
  static slugify(text: string, separator: string = '-'): string {
    // Normalize text for handling accented characters
    const normalized = text
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const replaced = normalized
      .replaceAll(new RegExp(/(\s+)/g), ' ')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '') // Remove non-alphanumeric characters and spaces
      .replace(/\s+/g, separator) // Replace spaces with separator (default is '-')
      .replace(/-+/g, separator) // Remove duplicate separators

    if (replaced.endsWith('_')) return replaced.substring(0, replaced.length - 1)
    return replaced
  }
}
