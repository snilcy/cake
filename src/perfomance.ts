import { wait } from '.'

export const throttle = (fn: Function, wait: number = 300) => {
  let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number
  return function (this: any) {
    const context = this,
      args = arguments
    if (inThrottle) {
      clearTimeout(lastFn)
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args)
            lastTime = Date.now()
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0),
      )
    } else {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    }
  }
}

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export interface ICakeRateLimitParams {
  interval: number
  parallel?: number
  perInterval: number
}

export interface ICakeRateLimitIntervalData {
  executeCounte: number
  startTime: number
}

export class RateLimit {
  readonly interval!: number
  readonly parallel = Infinity
  readonly perInterval!: number

  private intervalData: ICakeRateLimitIntervalData = this.updateIntervalData()

  constructor({
    interval,
    parallel = Infinity,
    perInterval,
  }: ICakeRateLimitParams) {
    this.interval = interval
    this.parallel = parallel
    this.perInterval = perInterval
  }

  private getIntervalData() {
    const intervalData = this.intervalData

    if (intervalData.startTime + this.interval <= performance.now()) {
      return this.updateIntervalData()
    }

    if (intervalData.executeCounte >= this.perInterval) {
      return this.updateIntervalData(intervalData.startTime + this.interval)
    }

    return intervalData
  }

  private updateIntervalData(time: number = performance.now()) {
    this.intervalData = {
      executeCounte: 0,
      startTime: time,
    }
    return this.intervalData
  }

  push<R = {}>(callback: () => R) {
    const lastIntervalData = this.getIntervalData()

    const promise: Promise<R> = new Promise((resolve, reject) => {
      lastIntervalData.executeCounte += 1
      setTimeout(async () => {
        try {
          const result = await callback()
          resolve(result)
        } catch (error) {
          reject(error)
        }
      }, lastIntervalData.startTime - performance.now())
    })

    return promise
  }
}

// const rlimit = new RateLimit({
//   interval: 10,
//   perInterval: 3,
// })

// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
// rlimit.push(() => wait(2))
