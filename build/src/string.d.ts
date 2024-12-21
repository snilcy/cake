export declare const CHAR_CODE: {
    a: number;
    A: number;
    z: number;
    Z: number;
};
export declare const isCharRange: (char: string, from: number, to: number) => boolean | 0 | undefined;
export declare const isUpperChar: (char: string) => boolean | 0 | undefined;
export declare const isLowerChar: (char: string) => boolean | 0 | undefined;
export declare const capitalize: (string: string) => string;
export declare enum IStringSeqType {
    Number = 0,
    Unknow = 1,
    Lower = 2,
    Upper = 3
}
export interface IStringSeq {
    type: IStringSeqType;
    value: string;
}
export declare const toKebabCase: (string: string) => string;
export declare const toCamelCase: (string: string) => string;
export declare const toUpperCase: (string: string) => string;
export declare const toPascalCase: (string: string) => string;
