/* eslint-disable @typescript-eslint/no-explicit-any */
export const first = <T>(arr: T[]) => arr.at(0)
export const last = <T>(arr: T[]) => arr.at(-1)
export const lastIndex = <T>(arr: T[]) => arr.length - 1
export const updateById = <T>(arr: T[], id: number, callback: (item: T) => T) => {
  arr[id] = callback(arr[id])
}
