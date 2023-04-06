import { isObject } from './type.js'

export const getConstructorName = (el) => isObject ? el.constructor.name : undefined
