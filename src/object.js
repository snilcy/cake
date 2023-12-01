"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.shallowMerge = exports.clone = exports.shallowClone = void 0;
var type_1 = require("./type");
var shallowClone = function (target) { return (__assign({}, target)); };
exports.shallowClone = shallowClone;
var clone = function (target) {
    var result = {};
    for (var key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            var value = target[key];
            if ((0, type_1.isObject)(value)) {
                result[key] = (0, exports.clone)(value);
            }
            else {
                target[key] = value;
            }
        }
    }
    return target;
};
exports.clone = clone;
var shallowMerge = function (first, second) {
    return Object.assign({}, first, second);
};
exports.shallowMerge = shallowMerge;
var merge = function (first, second) {
    var target = (0, exports.clone)(first);
    for (var key in second) {
        if (Object.hasOwnProperty.call(second, key)) {
            var secondValue = second[key];
            var targetValue = target[key];
            target[key] = (0, type_1.isObject)(targetValue) && (0, type_1.isObject)(secondValue) ? (0, exports.merge)(targetValue, secondValue) : secondValue;
        }
    }
    return target;
};
exports.merge = merge;
