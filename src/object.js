import { isObject } from './type.js'

export const merge = (target, ...objects) => {
  for (const object of objects) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        target[key] = object[key]
      }
    }
  }

  return target
}

export const deepMerge = (target, ...objectsArr) => {
  for (const object of objectsArr) {
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const newValue = object[key]
        const targetValue = target[key]

        if (isObject(targetValue) && isObject(newValue)) {
          target[key] = deepMerge(targetValue, newValue)
          continue
        }

        target[key] = newValue
      }
    }
  }

  return target
}
