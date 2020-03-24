import pipe from 'ramda/es/pipe';
import equals from 'ramda/es/equals';
import propSatisfies from 'ramda/es/propSatisfies';
import uniqBy from 'ramda/es/uniqBy';

export const toArray = <T>(v?: T | T[]): T[] => (typeof v === 'undefined' ? [] : Array.isArray(v) ? v : [v]);
export const mergeAndUniqArray = <T>(condition: (v: T) => string, prevData: T[], addData: T[]): T[] =>
  uniqBy(condition, [...addData, ...prevData]);

export const notEquals = <T>(v1: T, v2: T): boolean => !equals(v1, v2);
const _props = <T>(key: keyof T) => (obj: T): T[keyof T] => obj[key];
export const notPropEq = <T>(key: keyof T, value: T[keyof T]): ((v: T) => boolean) => (obj2: T): boolean =>
  !propSatisfies<T, T>(pipe(_props(key), equals(value)), String(key), obj2);
