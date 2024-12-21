export declare const first: <T>(array: T[]) => T | undefined;
export declare const last: <T>(array: T[]) => T | undefined;
export declare const lastIndex: <T>(array: T[]) => number;
export declare const updateById: <T>(array: T[], id: number, callback: (item: T) => T) => void;
export declare const toArray: <T = any>(data: any) => T[];
export declare const replace: <T>(arr: T[], target: T, value: T) => T[];
export declare const move: (arr: any[], from: number, to: number) => any[];
export declare const sizeSplit: <T>(arr: T[], sliceSize: number) => T[][];
