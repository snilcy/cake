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

export enum IStringSeqType {
  Number,
  Unknow,
  Lower,
  Upper,
}

export interface IStringSeq {
  type: IStringSeqType
  value: string
}

const getCharSeqType = (char: string): IStringSeqType => {
  const charCode = char.codePointAt(0)
  if (charCode === undefined) return IStringSeqType.Unknow

  if (charCode >= 97 && charCode <= 122) return IStringSeqType.Lower
  if (charCode >= 65 && charCode <= 90) return IStringSeqType.Upper
  if (charCode >= 48 && charCode <= 57) return IStringSeqType.Number

  return IStringSeqType.Unknow
}

const splitWords = (string: string) => {
  const result: IStringSeq[] = []

  for (const char of string) {
    const lastSeq = result.at(-1)
    const type = getCharSeqType(char)

    if (lastSeq) {
      if (lastSeq.type === type) {
        lastSeq.value += char
      } else {
        result.push({
          type,
          value: char,
        })
      }
    } else {
      result.push({
        type,
        value: char,
      })
    }
  }

  return result
  return result.filter(({ type }) => type !== IStringSeqType.Unknow)
}

export const toKebabCase = (string: string) => {
  return (
    splitWords(string)
      .map(({ type, value }, id, arr) => {
        if (type === IStringSeqType.Unknow) return ''
        const prev = arr[id - 1]

        if (id === 0 || prev?.type === IStringSeqType.Upper) {
          return value.toLowerCase()
        }
        return '-' + value.toLowerCase()
      })
      .filter(Boolean)
      // .filter(({ type }) => type !== IStringSeqType.Unknow)
      .join('')
  )
}

export const toCamelCase = (string: string) => {
  return splitWords(string)
    .map((seq, id, arr) => {
      if (seq.type === IStringSeqType.Unknow) return ''
      const prev = arr[id - 1]

      if (id > 0) {
        if (prev.type === IStringSeqType.Upper) {
          return seq.value.toLowerCase()
        }
        return capitalize(seq.value)
      }

      return seq.value.toLowerCase()
    })
    .join('')
}

export const toUpperCase = (string: string) => {
  return splitWords(string)
    .map((seq, id, arr) => {
      if (seq.type === IStringSeqType.Unknow) return ''

      const prev = arr[id - 1]
      if (prev) {
        if (prev.type === IStringSeqType.Upper) {
          return seq.value.toUpperCase()
        }

        return '_' + seq.value.toUpperCase()
      }

      return seq.value.toUpperCase()
    })
    .join('')
}

export const toPascalCase = (string: string) => {
  return splitWords(string)
    .map((seq, id, arr) => {
      if (seq.type === IStringSeqType.Unknow) return ''

      if (arr[id - 1] && arr[id - 1].type === IStringSeqType.Upper) {
        return seq.value
      }
      return capitalize(seq.value)
    })
    .join('')
}

// console.log(toUpperCase('TinkoffAssetStructuredProduct').toLowerCase())
