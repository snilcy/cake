import {
  expect,
  test,
} from 'bun:test'

import {
  merge,
  shallowMerge,
} from '../src/object'

test('shallowMerge', () => {
  test('shallowMerge correctly single', () => {
    const value = shallowMerge({
      inner: {
        some: Error,
      },
      one: 1,
      two: 'str',
    }, {
      inner: null,
      three: true,
    })

    const result = {
      inner: null,
      one: 1,
      three: true,
      two: 'str',
    }

    expect(value).toEqual(result)
  })
})

test('merge', () => {
  test('merge correctly single', () => {
    expect(merge({
      inner: {
        some: Error,
      },
      one: 1,
      two: 'str',
    }, {
      inner: {
        foo: {
          bar: 137,
        },
      },
      three: true,
    })).toEqual({
      inner: {
        foo: {
          bar: 137,
        },
        some: Error,
      },
      one: 1,
      three: true,
      two: 'str',
    } as never)
  })
  test('merge correctly arrays', () => {
    const one = {
      arr: [1,
        3],
      one: 1,
      two: 'str',
    }
    expect(merge(one, {
      arr: [...one.arr,
        7],
      three: true,
    })).toEqual({
      arr: [1,
        3,
        7],
      one: 1,
      three: true,
      two: 'str',
    } as never)
  })
})
