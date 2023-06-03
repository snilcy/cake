export declare const shallowClone: <T extends object>(target: T) => T;
export declare const clone: <T extends object>(target: T) => T;
export declare const shallowMerge: <F extends object, S extends object>(first: F, second: S) => F & S;
export declare const merge: <T extends object>(first: T, second: T) => T;
