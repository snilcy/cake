"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstructorName = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var getConstructorName = function (element) { var _a; return (_a = element === null || element === void 0 ? void 0 : element.constructor) === null || _a === void 0 ? void 0 : _a.name; };
exports.getConstructorName = getConstructorName;
