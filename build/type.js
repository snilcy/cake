/* eslint-disable @typescript-eslint/no-explicit-any */
export const isString = (el) => typeof el === 'string';
export const isNull = (el) => el === null;
export const isArray = (el) => Array.isArray(el);
export const isObject = (el) => typeof el === 'object' &&
    !isNull(el) &&
    !isArray(el);
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (el) => typeof el === 'function';
export const isError = (el) => el instanceof Error;
export const isUndefined = (el) => typeof el === 'undefined';
