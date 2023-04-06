export const isNull = (el) => el === null
export const isObject = (el) => typeof el === 'object' && !isNull(el)
export const isFunction = (el) => typeof el === 'function'
