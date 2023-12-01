import {
  expect,
  test,
} from 'bun:test'

import {
  isError,
  isNull,
  isObject,
} from '../src/type'

class SomeError extends Error {}

test('isNull', () => {
  test.each([
    {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function () {},
    137,
    'one',
    true,
    Object,
  ])('falsy %p', (element) => {
    expect(isNull(element)).toBeFalsy()
  })
  test('null', () => {
    expect(isNull(null)).toBeTruthy()
  })
})

test('isObject', () => {
  test.each([
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function () {},
    137,
    'one',
    true,
    Object,
    null,
  ])('falsy %p', (element) => {
    expect(isObject(element)).toBeFalsy()
  })
  test('{}', () => {
    expect(isObject({})).toBeTruthy()
  })
})

test('isError', () => {
  test.each([
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function () {},
    137,
    'one',
    true,
    Object,
    null,
  ])('falsy %p', (element) => {
    expect(isError(element)).toBeFalsy()
  })
  test.each([
    new Error(),
    new SomeError(),
  ])('truthy %p', (error) => {
    expect(isError(error)).toBeTruthy()
  })
})
