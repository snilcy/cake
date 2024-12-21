import { expect, test } from 'bun:test';
import { deepMerge, shallowMerge } from './object';
test('shallowMerge correctly single', () => {
    const value = shallowMerge({
        inner: 'one',
        number: 1,
        two: 'str',
    }, {
        inner: '123',
        number: 137,
    });
    const result = {
        inner: '123',
        number: 137,
        two: 'str',
    };
    expect(value).toEqual(result);
});
test('deepMerge correctly single', () => {
    const value = deepMerge({
        inner: {
            inner: { a: 3 },
            number: 1,
            some: 'one',
        },
        one: 1,
        two: 'str',
    }, {
        inner: {
            number: 137,
            some: 'two',
        },
        one: 137,
        two: 'str2',
    });
    const result = {
        inner: {
            inner: { a: 3 },
            number: 137,
            some: 'two',
        },
        one: 137,
        two: 'str2',
    };
    expect(value).toEqual(result);
});
test('deepMerge correctly arrays', () => {
    const one = {
        array: [1, 3],
        one: 1,
        three: true,
        two: 'str',
    };
    const value = deepMerge(one, {
        array: [...one.array, 7],
    });
    const result = {
        array: [1, 3, 7],
        one: 1,
        three: true,
        two: 'str',
    };
    expect(value).toEqual(result);
});
