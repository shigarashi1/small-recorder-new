import uniqBy from 'ramda/es/uniqBy';

export const toArray = <T>(v?: T | T[]): T[] => (typeof v === 'undefined' ? [] : Array.isArray(v) ? v : [v]);
export const mergeAndUniqArray = <T>(condition: (v: T) => string, prevData: T[], addData: T[]): T[] =>
  uniqBy(condition, [...addData, ...prevData]);
