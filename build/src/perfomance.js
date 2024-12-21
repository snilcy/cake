export const throttle = (fn, wait = 300) => {
    let inThrottle, lastFn, lastTime;
    return function () {
        const args = arguments, context = this;
        if (inThrottle) {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
        else {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        }
    };
};
export const debounce = (fn, ms = 300, params = {}) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (params.onStart)
                params.onStart();
            // Promise.resolve(fn(this, args)).finally(() => {
            //   console.log('finally')
            //   if (params.onEnd) params.onEnd()
            // })
            const result = fn.apply(this, args);
            if (result instanceof Promise) {
                result.finally(() => {
                    if (params.onEnd)
                        params.onEnd();
                });
            }
            else {
                if (params.onEnd)
                    params.onEnd();
            }
        }, ms);
    };
};
export class RateLimit {
    interval;
    parallel = Infinity;
    perInterval;
    intervalData = this.updateIntervalData();
    constructor({ interval, parallel = Infinity, perInterval, }) {
        this.interval = interval;
        this.parallel = parallel;
        this.perInterval = perInterval;
    }
    getIntervalData() {
        const intervalData = this.intervalData;
        if (intervalData.startTime + this.interval <= performance.now()) {
            return this.updateIntervalData();
        }
        if (intervalData.executeCounte >= this.perInterval) {
            return this.updateIntervalData(intervalData.startTime + this.interval);
        }
        return intervalData;
    }
    updateIntervalData(time = performance.now()) {
        this.intervalData = {
            executeCounte: 0,
            startTime: time,
        };
        return this.intervalData;
    }
    push(callback) {
        const lastIntervalData = this.getIntervalData();
        const promise = new Promise((resolve, reject) => {
            lastIntervalData.executeCounte += 1;
            setTimeout(async () => {
                try {
                    const result = await callback();
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            }, lastIntervalData.startTime - performance.now());
        });
        return promise;
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
