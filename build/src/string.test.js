import { describe, expect, test } from 'bun:test';
import { toCamelCase, toKebabCase, toPascalCase, toUpperCase } from '.';
describe('toKebabCase', () => {
    test('camelCase', () => {
        expect(toKebabCase('camelCase')).toBe('camel-case');
    });
    test('kebab-case', () => {
        expect(toKebabCase('kebab-case')).toBe('kebab-case');
    });
    test('snake_case', () => {
        expect(toKebabCase('snake_case')).toBe('snake-case');
    });
    test('flat', () => {
        expect(toKebabCase('description')).toBe('description');
    });
    test('PascalCase', () => {
        expect(toKebabCase('PascalCase')).toBe('pascal-case');
    });
    test('UPPER_CASE', () => {
        expect(toKebabCase('UPPER_CASE')).toBe('upper-case');
    });
    test('1UPPER_CASE', () => {
        expect(toKebabCase('1UPPER_CASE')).toBe('1-upper-case');
    });
});
describe('camelCase', () => {
    test('camelCase', () => {
        expect(toCamelCase('camelCase')).toBe('camelCase');
    });
    test('kebab-case', () => {
        expect(toCamelCase('kebab-case')).toBe('kebabCase');
    });
    test('snake_case', () => {
        expect(toCamelCase('snake_case')).toBe('snakeCase');
    });
    test('flat', () => {
        expect(toCamelCase('description')).toBe('description');
    });
    test('PascalCase', () => {
        expect(toCamelCase('PascalCase')).toBe('pascalCase');
    });
    test('1UPPER_CASE', () => {
        expect(toCamelCase('1UPPER_CASE')).toBe('1UpperCase');
    });
});
describe('UPPER_CASE', () => {
    test('camelCase', () => {
        expect(toUpperCase('camelCase')).toBe('CAMEL_CASE');
    });
    test('kebab-case', () => {
        expect(toUpperCase('kebab-case')).toBe('KEBAB_CASE');
    });
    test('snake_case', () => {
        expect(toUpperCase('snake_case')).toBe('SNAKE_CASE');
    });
    test('flat', () => {
        expect(toUpperCase('description')).toBe('DESCRIPTION');
    });
    test('PascalCase', () => {
        expect(toUpperCase('PascalCase')).toBe('PASCAL_CASE');
    });
    test('UPPER_CASE', () => {
        expect(toUpperCase('UPPER_CASE')).toBe('UPPER_CASE');
    });
    test('1UPPER_CASE', () => {
        expect(toUpperCase('1UPPER_CASE')).toBe('1_UPPER_CASE');
    });
});
describe('PascalCase', () => {
    test('camelCase', () => {
        expect(toPascalCase('camelCase')).toBe('CamelCase');
    });
    test('kebab-case', () => {
        expect(toPascalCase('kebab-case')).toBe('KebabCase');
    });
    test('snake_case', () => {
        expect(toPascalCase('snake_case')).toBe('SnakeCase');
    });
    test('flat', () => {
        expect(toPascalCase('description')).toBe('Description');
    });
    test('PascalCase', () => {
        expect(toPascalCase('PascalCase')).toBe('PascalCase');
    });
    test('UPPER_CASE', () => {
        expect(toPascalCase('UPPER_CASE')).toBe('UpperCase');
    });
    test('1UPPER_CASE', () => {
        expect(toPascalCase('1UPPER_CASE')).toBe('1UpperCase');
    });
});
