import { IDeepPartial, IObject } from './ts/utils'
import { isObject } from './type'

export const shallowClone = <T extends IObject>(target: T): T => ({ ...target })

export const deepClone = <T extends IObject>(target: T): T => {
  const result = {} as T

  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key]

      if (isObject(value)) {
        result[key] = deepClone(value)
      } else {
        target[key] = value
      }
    }
  }

  return target
}

export const shallowMerge = <T extends IObject>(
  first: T,
  second: Partial<T>,
): T => ({
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
        isObject(targetValue) && isObject(secondValue)
          ? deepMerge(targetValue, secondValue)
          : (secondValue as typeof targetValue)
    }
  }

  return target as T
}

export const join = <R, T extends IObject>(
  target: T,
  callback: (key: string, value: keyof T) => R,
) => Object.keys(target).map((key) => callback(key, target[key]))

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
