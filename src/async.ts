import { toArray } from '.'

export const wait = (time: number, ...extra: any[]) => {
  const start = Date.now()
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          duration: Date.now() - start,
          end: Date.now(),
          extra,
          start,
        }),
      time,
    )
  })
}

export const compose = async (
  ...promisesList: (Promise<any> | Promise<any>[])[]
) => {
  const list = promisesList.map((promises) => toArray<Promise<any>>(promises))

  for (const promises of list) {
    await Promise.all(promises)
  }
}

export const serial = async <A, R, T extends (...args: A[]) => Promise<R>>(
  method: T,
  argsList: A[][],
): Promise<R[]> => {
  const result: R[] = []

  for (const args of argsList) {
    result.push(await method(...args))
  }

  return result
}
