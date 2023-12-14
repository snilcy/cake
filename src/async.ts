import { toArray } from '.'

export const compose = async (
  ...promisesList: (Promise<any> | Promise<any>[])[]
) => {
  const list = promisesList.map((promises) => toArray<Promise<any>>(promises))

  for (const promises of list) {
    await Promise.all(promises)
  }
}
