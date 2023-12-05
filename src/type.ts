/* eslint-disable @typescript-eslint/array-type */
export const isString = (element: any): element is string =>
  typeof element === 'string'

export const isNull = (element: any): element is null => element === null

export const isArray = Array.isArray

export const isObject = (element: any): element is object =>
  typeof element === 'object' && !isNull(element) && !isArray(element)

export const isFunction = (
  element: any,
): // eslint-disable-next-line @typescript-eslint/ban-types
element is Function => typeof element === 'function'

export const isError = (element: any): element is Error =>
  element instanceof Error

export const isUndefined = (element: any): element is undefined =>
  element === undefined
