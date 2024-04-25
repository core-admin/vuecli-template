import { isNil } from 'lodash-es';

const toString = Object.prototype.toString;

export function is(value: unknown, type: string) {
  return toString.call(value) === `[object ${type}]`;
}

export const isDef = <T = unknown>(value: T): value is T => typeof value !== 'undefined';

export const isUnDef = (value?: unknown): value is undefined => !isDef(value);

export const isObject = (value: unknown): value is Record<any, any> =>
  value !== null && is(value, 'Object');

export const isNotEmpty = <T = unknown>(value: T): value is T => !isNil(value) && !isEmpty(value);

export function isEmpty<T = unknown>(value: T): value is T {
  if (isNil(value)) {
    return true;
  }

  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

export function isNullOrUnDef(value: unknown): value is null | undefined {
  return isUnDef(value) || isNull(value);
}

export const isNumber = (value: unknown): value is number => is(value, 'Number');

export const isString = (value: unknown): value is string => is(value, 'String');

export const isBoolean = (value: unknown): value is boolean => is(value, 'Boolean');

export const isNull = (value: unknown): value is null => value === null;

export const isDate = (value: unknown): value is Date => is(value, 'Date');

export const isRegExp = (value: unknown): value is RegExp => is(value, 'RegExp');

export const isMap = (value: unknown): value is Map<any, any> => is(value, 'Map');

export const isArray = (value: unknown): value is Array<any> => !!value && Array.isArray(value);

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    is(value, 'Promise') && isObject(value) && isFunction(value.then) && isFunction(value.catch)
  );
}

export function isWindow(value: any): value is Window {
  return typeof window !== 'undefined' && is(value, 'Window');
}

export function isElement(value: unknown): value is Element {
  return isObject(value) && !!value.tagName;
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;
