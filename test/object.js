import { shallowMerge, merge } from '../build/object.js'

describe('shallowMerge', () => {
  test('shallowMerge correctly single', () => {
    expect(shallowMerge({
      one: 1,
      two: 'str',
      inner: { some: Error },
    }, {
      three: true,
      inner: null,
    })).toEqual({
      one: 1,
      two: 'str',
      three: true,
      inner: null,
    })
  })
})

describe('merge', () => {
  test('merge correctly single', () => {
    expect(merge({
      one: 1,
      two: 'str',
      inner: { some: Error },
    }, {
      three: true,
      inner: { foo: { bar: 137 }},
    })).toEqual({
      one: 1,
      two: 'str',
      three: true,
      inner: { some: Error, foo: { bar: 137 }},
    })
  })
  test('merge correctly arrays', () => {
    const one = {
      one: 1,
      two: 'str',
      arr: [ 1, 3 ],
    }
    expect(merge(one, {
      three: true,
      arr: one.arr.concat(7),
    })).toEqual({
      one: 1,
      two: 'str',
      three: true,
      arr: [ 1,3,7 ],
    })
  })
})
