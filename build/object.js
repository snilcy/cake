import { isObject } from './type.js';
export const shallowClone = (target) => ({
    ...target,
});
export const clone = (target) => {
    const result = {};
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            const value = target[key];
            if (isObject(value)) {
                result[key] = clone(value);
            }
            else {
                target[key] = value;
            }
        }
    }
    return target;
};
export const shallowMerge = (first, second) => ({
    ...first,
    ...second,
});
export const merge = (first, second) => {
    const target = clone(first);
    for (const key in second) {
        if (Object.hasOwnProperty.call(second, key)) {
            const secondValue = second[key];
            const targetValue = target[key];
            if (isObject(targetValue) && isObject(secondValue)) {
                target[key] = merge(targetValue, secondValue);
            }
            else {
                target[key] = secondValue;
            }
        }
    }
    return target;
};
