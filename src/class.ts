export const getConstructorName = (element: any): string =>
  element?.constructor?.name

export const isExtends = <T = any>(target: any, targetParent: T): target is T =>
  target && Object.getPrototypeOf(target) === targetParent
