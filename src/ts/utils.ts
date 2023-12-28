import type { DeepPartial, ValuesType } from 'utility-types'

export type IDeepPartial<T> = DeepPartial<T>

export type IObject<T = any> = Record<string, T>

export type IBooleanValue = IObject<boolean>

export type IValuesType<
  T extends ArrayLike<any> | readonly any[] | Record<any, any>,
> = ValuesType<T>
