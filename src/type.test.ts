import { describe, expect, test } from 'bun:test'

import chalk from 'chalk'

import { isError, isNull, isObject } from './type'

class SomeError extends Error {}

const title = `falsy ${chalk.magenta('%o')}`

describe('isNull', () => {
  test.each([{}, 137, 'one', true])(title, (element) => {
    expect(isNull(element)).toBeFalsy()
  })

  test('null', () => {
    expect(isNull(null)).toBeTruthy()
  })
})

describe('isObject', () => {
  test.each([137, 'one', true, null])(title, (element) => {
    expect(isObject(element)).toBeFalsy()
  })

  test('{}', () => {
    expect(isObject({})).toBeTruthy()
  })
})

describe('isError', () => {
  test.each([137, 'one', true, null])(title, (element) => {
    expect(isError(element)).toBeFalsy()
  })

  test.each([new Error('Error'), new SomeError('Error')])(
    'truthy %p',
    (error) => {
      expect(isError(error)).toBeTruthy()
    },
  )
})
