export const isString = (element: any): element is string =>
  typeof element === 'string'

export const isNull = (element: any): element is null => element === null

export const isArray = Array.isArray

export const isObject = (element: any): element is object =>
  typeof element === 'object' && !isNull(element) && !isArray(element)

export const isObjectLiteral = (element: any): element is object =>
  element && Object.getPrototypeOf(element) === Object.prototype

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (element: any): element is Function =>
  typeof element === 'function'

export const isError = (element: any): element is Error =>
  element instanceof Error

export const isUndefined = (element: any): element is undefined =>
  element === undefined

export const isNullable = <T>(element: T) =>
  element === undefined || element === null

export const isBrowserEnvironment = new Function(
  'try {return this===window;}catch(e){ return false;}',
)

export const isNodeEnvironment = new Function(
  'try {return this===global;}catch(e){return false;}',
)

export { default as is } from '@sindresorhus/is'
