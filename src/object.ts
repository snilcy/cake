import { isObject } from './type.js'

export const shallowClone = <T extends object>(target: T): T => ({
  ...target,
})

export const clone = <T extends object>(target: T): T => {
  const result = {} as T

  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key]

      if (isObject(value)) {
        result[key] = clone(value)
      } else {
        target[key] = value
      }

    }
  }

  return target
}

export const shallowMerge = <F extends object, S extends object>(first: F, second: S) => ({
  ...first,
  ...second,
})

export const merge = <T extends object>(first: T, second: T) => {
  const target = clone(first)

  for (const key in second) {
    if (Object.hasOwnProperty.call(second, key)) {
      const secondValue = second[key]
      const targetValue = target[key]

      if (isObject(targetValue) && isObject(secondValue)) {
        target[key] = merge(targetValue, secondValue)
      } else {
        target[key] = secondValue
      }

    }
  }

  return target
}
