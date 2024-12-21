export declare const isString: (element: any) => element is string;
export declare const isNull: (element: any) => element is null;
export declare const isArray: (arg: any) => arg is any[];
export declare const isObject: (element: any) => element is object;
export declare const isObjectLiteral: (element: any) => element is object;
export declare const isFunction: (element: any) => element is Function;
export declare const isError: (element: any) => element is Error;
export declare const isUndefined: (element: any) => element is undefined;
export declare const isNullable: <T>(element: T) => boolean;
export declare const isBrowserEnvironment: Function;
export declare const isNodeEnvironment: Function;
export { default as is } from '@sindresorhus/is';
