export declare const throttle: (fn: Function, wait?: number) => (this: any) => void;
export declare const debounce: (fn: Function, ms?: number, params?: {
    onEnd?: () => void;
    onStart?: () => void;
}) => (this: any, ...args: any[]) => void;
export interface ICakeRateLimitParams {
    interval: number;
    parallel?: number;
    perInterval: number;
}
export interface ICakeRateLimitIntervalData {
    executeCounte: number;
    startTime: number;
}
export declare class RateLimit {
    readonly interval: number;
    readonly parallel: number;
    readonly perInterval: number;
    private intervalData;
    constructor({ interval, parallel, perInterval, }: ICakeRateLimitParams);
    private getIntervalData;
    private updateIntervalData;
    push<R = {}>(callback: () => R): Promise<R>;
}
