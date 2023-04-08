export const isNull = (el) => el === null
export const isArray = (el) => Array.isArray(el)
export const isObject = (el) =>
  typeof el === 'object' &&
    !isNull(el) &&
    !isArray(el)
export const isFunction = (el) => typeof el === 'function'
export const isError = (el) => el instanceof Error
export const isUndefined = (el) => typeof el === 'undefined'
