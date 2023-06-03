import { isError, isNull, isObject } from '../build/type.js'

class SomeError extends Error {}

describe('isNull', () => {
  test.each([
    {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function(){},
    137,
    'one',
    true,
    Object,
  ])('falsy %p', (el) => {
    expect(isNull(el)).toBeFalsy()
  })
  test('null', () => {
    expect(isNull(null)).toBeTruthy()
  })
})

describe('isObject', () => {
  test.each([
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function(){},
    137,
    'one',
    true,
    Object,
    null,
  ])('falsy %p', (el) => {
    expect(isObject(el)).toBeFalsy()
  })
  test('{}', () => {
    expect(isObject({})).toBeTruthy()
  })
})

describe('isError', () => {
  test.each([
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function(){},
    137,
    'one',
    true,
    Object,
    null,
  ])('falsy %p', (el) => {
    expect(isError(el)).toBeFalsy()
  })
  test.each([
    new Error(),
    new SomeError(),
  ])('truthy %p', (err) => {
    expect(isError(err)).toBeTruthy()
  })
})
