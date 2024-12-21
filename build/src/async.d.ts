export declare const wait: (time: number, ...extra: any[]) => Promise<unknown>;
export declare const compose: (...promisesList: (Promise<any> | Promise<any>[])[]) => Promise<void>;
export declare const serial: <A, R, T extends (...args: A[]) => Promise<R>>(method: T, argsList: A[][]) => Promise<R[]>;
