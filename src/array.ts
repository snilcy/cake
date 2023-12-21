import { isArray } from './type'

export const first = <T>(array: T[]) => array.at(0)

export const last = <T>(array: T[]) => array.at(-1)

export const lastIndex = <T>(array: T[]) => array.length - 1

export const updateById = <T>(
  array: T[],
  id: number,
  callback: (item: T) => T,
) => {
  array[id] = callback(array[id])
}

export const toArray = <T = any>(data: any) =>
  (isArray(data) ? data : [data]) as T[]

export const replace = <T>(arr: T[], target: T, value: T) =>
  arr.map((item) => (item === target ? value : item))
