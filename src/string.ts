export const CHAR_CODE = {
  a: 97,
  A: 65,
  z: 122,
  Z: 90,
}

export const isCharRange = (char: string, from: number, to: number) => {
  const charCode = char.codePointAt(0)
  return charCode && charCode >= from && charCode <= to
}

export const isUpperChar = (char: string) =>
  isCharRange(char, CHAR_CODE.A, CHAR_CODE.Z)

export const isLowerChar = (char: string) =>
  isCharRange(char, CHAR_CODE.a, CHAR_CODE.z)

const isWordChar = (char: string) => isUpperChar(char) || isLowerChar(char)

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

const splitWords = (string: string) =>
  string
    .replaceAll(/(?<![A-Z])[A-Z](?![A-Z])/g, (char, index) =>
      index > 0 ? `-${char}` : char,
    )
    .toLowerCase()
    .split(/[_-]/g)

export const toKebabCase = (string: string) => splitWords(string).join('-')

export const toCamelCase = (string: string) =>
  splitWords(string)
    .map((word, id) => (id > 0 ? capitalize(word) : word))
    .join('')

export const toUpperCase = (string: string) =>
  splitWords(string)
    .map((word) => word.toUpperCase())
    .join('_')

export const toPascalCase = (string: string) =>
  splitWords(string)
    .map((word) => capitalize(word))
    .join('')
