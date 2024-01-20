import { IDeepPartial, IObject } from './ts/utils'
import { isObject, isObjectLiteral } from './type'

export const shallowClone = <T extends IObject>(target: T): T => ({ ...target })

export const deepClone = <T extends IObject>(target: T): T => {
  const result = {} as T

  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key]

      result[key] = isObjectLiteral(value) ? deepClone(value) : value
    }
  }

  return result
}

export const shallowMerge = <T = {}>(first: T, second: Partial<T> = {}): T => ({
  ...first,
  ...second,
})

export const deepMerge = <T extends IObject>(
  first: T,
  second: IDeepPartial<T>,
) => {
  const target = deepClone(first)

  for (const key in second) {
    if (Object.hasOwnProperty.call(second, key)) {
      const secondValue = second[key]
      const targetValue = target[key]

      target[key] =
        isObjectLiteral(targetValue) && isObjectLiteral(secondValue)
          ? deepMerge(targetValue, secondValue)
          : (secondValue as typeof targetValue)
    }
  }

  return target as T
}

export const join = <R, T extends IObject>(
  target: T,
  callback: (key: string, value: keyof T) => R,
  separator = ' ',
) =>
  Object.keys(target)
    .map((key) => callback(key, target[key]))
    .join(separator)

export const map = <R = any, T extends IObject = {}>(
  target: T,
  callback: (value: T[keyof T], key: keyof T) => R,
): Record<keyof T, R> => {
  const result = {} as Record<keyof T, R>

  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key]
      result[key] = callback(value, key)
    }
  }

  return result
}

export const flat = (target: IObject, delimeter = '-') =>
  Object.entries(target).reduce((result: IObject, [key, value]) => {
    if (isObjectLiteral(value)) {
      for (const [flatKey, flatValue] of Object.entries(flat(value))) {
        result[[key, flatKey].join(delimeter)] = flatValue
      }
    } else {
      result[key] = value
    }

    return result
  }, {})

export const optinalPath = (objPath: string[], target: IObject, value: any) => {
  objPath.reduce((result, path, id) => {
    result[path] = id === objPath.length - 1 ? value : result[path] || {}
    return result[path]
  }, target)
}

export const diff = <T extends IObject>(first: T, second: T) => {
  const result: IObject = {} as T

  for (const [key, firstValue] of Object.entries(first)) {
    if (Object.hasOwn(second, key)) {
      const secondValue = second[key]

      if (isObjectLiteral(firstValue) && isObjectLiteral(secondValue)) {
        const objectDiff = diff(firstValue, secondValue)
        if (Object.keys(objectDiff).length > 0) {
          result[key] = objectDiff
        }
      } else if (firstValue !== secondValue) {
        result[key] = secondValue
      }
    } else {
      result[key] = second[key]
    }
  }

  return result as IDeepPartial<T>
}
