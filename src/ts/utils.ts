import type { DeepPartial, ValuesType } from 'utility-types'

export type IDeepPartial<T> = DeepPartial<T>

export type IObject<
  V = any,
  K extends number | string | symbol = string,
> = Record<K, V>

export type IBooleanValue = IObject<boolean>

export type IValuesType<
  T extends ArrayLike<any> | readonly any[] | Record<any, any>,
> = ValuesType<T>

export type IWriteable<T> = { -readonly [P in keyof T]: T[P] }

export type IConstructable<T = any> = new (...args: any[]) => T

export type IRecursive<T> = IObject<IObject<T> | T>

export type IWithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
