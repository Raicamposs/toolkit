import { describe, expect, it } from 'vitest'
import { StringUtils } from './StringUtils'

describe('StringUtils', () => {

  it('should convert to snake_case', () => {
    expect(StringUtils.toSnakeCase('helloWorld')).toBe('hello_world')
    expect(StringUtils.toSnakeCase('HelloWorld')).toBe('hello_world')
    expect(StringUtils.toSnakeCase('Hello World!')).toBe('hello_world')
    expect(StringUtils.toSnakeCase('')).toBe('')
    expect(StringUtils.toSnakeCase('   ')).toBe('')
  })

  it('should convert to kebab-case', () => {
    expect(StringUtils.toKebabCase('helloWorld')).toBe('hello-world')
    expect(StringUtils.toKebabCase('HelloWorld')).toBe('hello-world')
    expect(StringUtils.toKebabCase('Hello World!')).toBe('hello-world')
    expect(StringUtils.toKebabCase('')).toBe('')
    expect(StringUtils.toKebabCase('   ')).toBe('')
  })

  it('should convert to title case', () => {
    expect(StringUtils.toTitleCase('hello world')).toBe('Hello World')
    expect(StringUtils.toTitleCase('UPPERCASE TEXT')).toBe('Uppercase Text')
    expect(StringUtils.toTitleCase('')).toBe('')
    expect(StringUtils.toTitleCase('   ')).toBe('')
  })

  it('should convert to camel case', () => {
    expect(StringUtils.toCamelCase('hello world')).toBe('helloWorld')
    expect(StringUtils.toCamelCase('Hello World')).toBe('helloWorld')
    expect(StringUtils.toCamelCase('Hello World!')).toBe('helloWorld')
    expect(StringUtils.toCamelCase('')).toBe('')
    expect(StringUtils.toCamelCase('   ')).toBe('')
  })

  it('should slugify a string', () => {
    expect(StringUtils.slugify('Olá, mundo!')).toBe('ola-mundo')
    expect(StringUtils.slugify('Hello World!')).toBe('hello-world')
    expect(StringUtils.slugify('')).toBe('')
    expect(StringUtils.slugify('   ')).toBe('')
    expect(StringUtils.slugify('Hello World!', '_')).toBe('hello_world')
    expect(StringUtils.slugify('Hello World!', '-')).toBe('hello-world')
  })

})
