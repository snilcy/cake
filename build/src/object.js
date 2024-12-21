import { isObject, isObjectLiteral } from './type';
export const shallowClone = (target) => ({ ...target });
export const deepClone = (target) => {
    const result = {};
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            const value = target[key];
            result[key] = isObjectLiteral(value) ? deepClone(value) : value;
        }
    }
    return result;
};
export const shallowMerge = (first, second = {}) => ({
    ...first,
    ...second,
});
export const deepMerge = (first, second) => {
    const target = deepClone(first);
    for (const key in second) {
        if (Object.hasOwnProperty.call(second, key)) {
            const secondValue = second[key];
            const targetValue = target[key];
            target[key] =
                isObjectLiteral(targetValue) && isObjectLiteral(secondValue)
                    ? deepMerge(targetValue, secondValue)
                    : secondValue;
        }
    }
    return target;
};
export const join = (target, callback, separator = ' ') => Object.keys(target)
    .map((key) => callback(key, target[key]))
    .join(separator);
export const map = (target, callback) => {
    const result = {};
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            const value = target[key];
            result[key] = callback(value, key);
        }
    }
    return result;
};
export const flat = (target, delimeter = '-') => Object.entries(target).reduce((result, [key, value]) => {
    if (isObjectLiteral(value)) {
        for (const [flatKey, flatValue] of Object.entries(flat(value))) {
            result[[key, flatKey].join(delimeter)] = flatValue;
        }
    }
    else {
        result[key] = value;
    }
    return result;
}, {});
export const optionalPath = (objPath, target, value) => {
    objPath.reduce((result, path, id) => {
        result[path] = id === objPath.length - 1 ? value : result[path] || {};
        return result[path];
    }, target);
};
export const diff = (first, second) => {
    const result = {};
    for (const [key, firstValue] of Object.entries(first)) {
        if (Object.hasOwn(second, key)) {
            const secondValue = second[key];
            if (isObjectLiteral(firstValue) && isObjectLiteral(secondValue)) {
                const objectDiff = diff(firstValue, secondValue);
                if (Object.keys(objectDiff).length > 0) {
                    result[key] = objectDiff;
                }
            }
            else if (firstValue !== secondValue) {
                result[key] = secondValue;
            }
        }
        else {
            result[key] = second[key];
        }
    }
    return result;
};
export const getOptionalPath = (obj, pathList = []) => {
    for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i];
        if (obj && typeof obj === 'object') {
            obj = obj[path];
            if (i === pathList.length - 1) {
                return obj;
            }
        }
    }
};
export const isShallowEqual = (first, second) => {
    if (!isObject(first) || !isObject(second))
        return false;
    if (first === second)
        return true;
    const firstKeys = Object.keys(first);
    const secondKeys = Object.keys(second);
    return (firstKeys.length === secondKeys.length &&
        firstKeys.every((key) => first[key] === second[key]));
};
