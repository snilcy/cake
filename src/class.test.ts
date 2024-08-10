import { describe, expect, test } from 'bun:test'

import { getConstructorName } from './class'

class Cat {}

describe('getConstructorName', () => {
  test('get correctly', () => {
    expect(getConstructorName({})).toBe('Object')

    expect(getConstructorName(() => {})).toBe('Function')
    expect(getConstructorName(new Cat())).toBe('Cat')
    expect(getConstructorName(new Cat())).toBe(Cat.name)
  })
})
