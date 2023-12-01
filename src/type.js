"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUndefined = exports.isError = exports.isFunction = exports.isObject = exports.isArray = exports.isNull = exports.isString = void 0;
var isString = function (element) { return typeof element === 'string'; };
exports.isString = isString;
var isNull = function (element) { return element === null; };
exports.isNull = isNull;
var isArray = function (element) { return Array.isArray(element); };
exports.isArray = isArray;
var isObject = function (element) {
    return typeof element === 'object' &&
        !(0, exports.isNull)(element) &&
        !(0, exports.isArray)(element);
};
exports.isObject = isObject;
var isFunction = function (element) { return typeof element === 'function'; };
exports.isFunction = isFunction;
var isError = function (element) { return element instanceof Error; };
exports.isError = isError;
var isUndefined = function (element) { return element === undefined; };
exports.isUndefined = isUndefined;
