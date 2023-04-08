import { merge, deepMerge } from '../src/object.js'

describe('merge', () => {
  test('merge correctly single', () => {
    expect(merge({
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
  test('merge correctly multiply', () => {
    expect(merge({
      one: 1,
      two: 'str',
      inner: { some: Error },
    }, {
      three: true,
      inner: null,
    }, {
      four: 4,
    })).toEqual({
      one: 1,
      two: 'str',
      three: true,
      inner: null,
      four: 4,
    })
  })
})

describe('deepMerge', () => {
  test('merge correctly single', () => {
    expect(deepMerge({
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
  test('merge correctly multiply', () => {
    expect(deepMerge({
      one: 1,
      two: 'str',
      inner: { some: Error },
    }, {
      three: true,
      inner: { foo: { bar: 137 }},
    }, {
      three: { name: 'JR' },
    })).toEqual({
      one: 1,
      two: 'str',
      three: { name: 'JR' },
      inner: { some: Error, foo: { bar: 137 },
      },
    })
  })
  test('merge correctly arrays', () => {
    const one = {
      one: 1,
      two: 'str',
      arr: [ 1, 3 ],
    }

    expect(deepMerge({}, one, {
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
