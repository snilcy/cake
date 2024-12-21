export const isString = (element) => typeof element === 'string';
export const isNull = (element) => element === null;
export const isArray = Array.isArray;
export const isObject = (element) => typeof element === 'object' && !isNull(element) && !isArray(element);
export const isObjectLiteral = (element) => element && Object.getPrototypeOf(element) === Object.prototype;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (element) => typeof element === 'function';
export const isError = (element) => element instanceof Error;
export const isUndefined = (element) => element === undefined;
export const isNullable = (element) => element === undefined || element === null;
export const isBrowserEnvironment = new Function('try {return this===window;}catch(e){ return false;}');
export const isNodeEnvironment = new Function('try {return this===global;}catch(e){return false;}');
export { default as is } from '@sindresorhus/is';
