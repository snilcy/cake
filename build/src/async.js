import { toArray } from '.';
export const wait = (time, ...extra) => {
    const start = Date.now();
    return new Promise((resolve) => {
        setTimeout(() => resolve({
            duration: Date.now() - start,
            end: Date.now(),
            extra,
            start,
        }), time);
    });
};
export const compose = async (...promisesList) => {
    const list = promisesList.map((promises) => toArray(promises));
    for (const promises of list) {
        await Promise.all(promises);
    }
};
export const serial = async (method, argsList) => {
    const result = [];
    for (const args of argsList) {
        result.push(await method(...args));
    }
    return result;
};
