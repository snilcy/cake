import { isObject } from './type'

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
      }
      else {
        target[key] = value
      }
    }
  }

  return target
}

export const shallowMerge = <F, S >(first: F, second: S): F & S => {
  return Object.assign({}, first, second)
}

export const merge = <T extends object>(first: T, second: Partial<T>) => {
  const target = clone(first)

  for (const key in second) {
    if (Object.hasOwnProperty.call(second, key)) {
      const secondValue = second[key]
      const targetValue = target[key]

      target[key] = isObject(targetValue) && isObject(secondValue) ? merge(targetValue, secondValue) : secondValue as typeof targetValue
    }
  }

  return target
}
