export const getConstructorName = (element) => element?.constructor?.name;
export const isExtends = (target, targetParent) => target && Object.getPrototypeOf(target) === targetParent;
