import type { DeepPartial, ValuesType } from 'utility-types'

export type IDeepPartial<T> = DeepPartial<T>

export type IObject = Record<string, any>

export type IValuesType<
  T extends ArrayLike<any> | readonly any[] | Record<any, any>,
> = ValuesType<T>
