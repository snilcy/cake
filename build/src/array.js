import { isArray } from './type';
export const first = (array) => array.at(0);
export const last = (array) => array.at(-1);
export const lastIndex = (array) => array.length - 1;
export const updateById = (array, id, callback) => {
    array[id] = callback(array[id]);
};
export const toArray = (data) => (isArray(data) ? data : [data]);
export const replace = (arr, target, value) => arr.map((item) => (item === target ? value : item));
export const move = (arr, from, to) => {
    const copy = [...arr];
    copy.splice(to, 0, copy.splice(from, 1)[0]);
    return copy;
};
export const sizeSplit = (arr, sliceSize) => {
    const slices = Math.round(arr.length / sliceSize);
    const result = [];
    if (slices === 0)
        return [[]];
    for (let i = 0; i < slices; i++) {
        result.push(arr.slice(i * sliceSize, i * sliceSize + sliceSize));
    }
    return result;
};
// const res = sizeSplit([], 2)
// console.log(res)
