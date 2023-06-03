/* eslint-disable @typescript-eslint/no-explicit-any */
export const first = (arr) => arr.at(0);
export const last = (arr) => arr.at(-1);
export const lastIndex = (arr) => arr.length - 1;
export const updateById = (arr, id, callback) => {
    arr[id] = callback(arr[id]);
};
