export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === "boolean";

export const isNumber = (val: unknown): val is number =>
  typeof val === "number";

export const isArray = <T = any>(val: unknown): val is Array<T> =>
  Array.isArray(val);

export const isPlainObject = (val: unknown): val is Record<string, any> =>
  Object.prototype.toString.call(val) === "[object Object]";

export const isObject = (val: unknown): val is Record<string, any> =>
  typeof val === "object" && val !== null;

export const isDef = <T = any>(val: unknown): val is T => val !== undefined;
