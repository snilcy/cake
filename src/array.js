"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.lastIndex = exports.last = exports.first = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var first = function (array) { return array.at(0); };
exports.first = first;
var last = function (array) { return array.at(-1); };
exports.last = last;
var lastIndex = function (array) { return array.length - 1; };
exports.lastIndex = lastIndex;
var updateById = function (array, id, callback) {
    array[id] = callback(array[id]);
};
exports.updateById = updateById;
