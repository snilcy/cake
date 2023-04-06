import { isNull, isObject } from '../src/type.js'

describe('isNull', () => {
  test.each([
    {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function(){},
    137,
    'one',
    true,
    Object,
  ])('falsy %s', (el) => {
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
  ])('falsy %s', (el) => {
    expect(isObject(el)).toBeFalsy()
  })
  test('{}', () => {
    expect(isObject({})).toBeTruthy()
  })
})
