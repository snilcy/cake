/* eslint-disable @typescript-eslint/no-explicit-any */

export const isString = (el: any): el is string => typeof el === 'string'

export const isNull = (el: any): el is null => el === null

export const isArray = (el: any): el is any[] => Array.isArray(el)

export const isObject = (el: any): el is object =>
  typeof el === 'object' &&
    !isNull(el) &&
    !isArray(el)

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (el: any): el is Function => typeof el === 'function'

export const isError = (el: any): el is Error => el instanceof Error

export const isUndefined = (el: any): el is undefined => typeof el === 'undefined'
