import { describe, expect, test } from 'bun:test'

import { toCamelCase, toKebabCase, toUpperCase } from '.'

describe('toKebabCase', () => {
  test('camelCase', () => {
    expect(toKebabCase('initialScale')).toBe('initial-scale')
  })
  test('kebab-case', () => {
    expect(toKebabCase('kebab-case')).toBe('kebab-case')
  })
  test('snake_case', () => {
    expect(toKebabCase('snake_case')).toBe('snake-case')
  })
  test('flat', () => {
    expect(toKebabCase('description')).toBe('description')
  })
  test('PascalCase', () => {
    expect(toKebabCase('PascalCase')).toBe('pascal-case')
  })
  test('UPPER_CASE', () => {
    expect(toKebabCase('UPPER_CASE')).toBe('upper-case')
  })
})

describe('camelCase', () => {
  test('camelCase', () => {
    expect(toCamelCase('initialScale')).toBe('initialScale')
  })
  test('kebab-case', () => {
    expect(toCamelCase('kebab-case')).toBe('kebabCase')
  })
  test('snake_case', () => {
    expect(toCamelCase('snake_case')).toBe('snakeCase')
  })
  test('flat', () => {
    expect(toCamelCase('description')).toBe('description')
  })
  test('PascalCase', () => {
    expect(toCamelCase('PascalCase')).toBe('pascalCase')
  })
  test('UPPER_CASE', () => {
    expect(toCamelCase('UPPER_CASE')).toBe('upperCase')
  })
})

describe.only('UPPER_CASE', () => {
  test('camelCase', () => {
    expect(toUpperCase('initialScale')).toBe('INITIAL_SCALE')
  })
  test('kebab-case', () => {
    expect(toUpperCase('kebab-case')).toBe('KEBAB_CASE')
  })
  test('snake_case', () => {
    expect(toUpperCase('snake_case')).toBe('SNAKE_CASE')
  })
  test('flat', () => {
    expect(toUpperCase('description')).toBe('DESCRIPTION')
  })
  test('PascalCase', () => {
    expect(toUpperCase('PascalCase')).toBe('PASCAL_CASE')
  })
  test('UPPER_CASE', () => {
    expect(toUpperCase('UPPER_CASE')).toBe('UPPER_CASE')
  })
})
