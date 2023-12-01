export const isString = (element: any): element is string => typeof element === 'string'

export const isNull = (element: any): element is null => element === null

export const isArray = (element: any): element is any[] => Array.isArray(element)

export const isObject = (element: any): element is object =>
  typeof element === 'object' &&
    !isNull(element) &&
    !isArray(element)

export const isFunction = (element: any): element is Function => typeof element === 'function'

export const isError = (element: any): element is Error => element instanceof Error

export const isUndefined = (element: any): element is undefined => element === undefined
