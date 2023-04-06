import { getConstructorName } from '../src/get.js'

class Cat {}

describe('getConstructorName', () => {
  test('get correctly', () => {
    expect(getConstructorName({})).toBe('Object')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(getConstructorName(() => {})).toBe('Function')
    expect(getConstructorName(new Cat)).toBe('Cat')
    expect(getConstructorName(new Cat)).toBe(Cat.name)
  })
})
