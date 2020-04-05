import { pipe, equals, propSatisfies, uniqBy } from '@/library/ramda';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { Logger } from '../models/logger';

export const toArray = <T>(v?: T | T[]): T[] => (typeof v === 'undefined' ? [] : Array.isArray(v) ? v : [v]);
export const mergeAndUniqArray = <T>(condition: (v: T) => string, prevData: T[], addData: T[]): T[] =>
  uniqBy(condition, [...addData, ...prevData]);

export const notEquals = <T>(v1: T, v2: T): boolean => !equals(v1, v2);
const _props = <T>(key: keyof T) => (obj: T): T[keyof T] => obj[key];
export const notPropEq = <T>(key: keyof T, value: T[keyof T]): ((v: T) => boolean) => (obj2: T): boolean =>
  !propSatisfies<T, T>(pipe(_props(key), equals(value)), String(key), obj2);

export const EDateFormat = {
  Day: 'yyyy-MM-dd',
  DayJp: 'yyyy年MM月dd日',
} as const;
export type TDateFormatKey = keyof typeof EDateFormat;
export type TDateFormat = typeof EDateFormat[TDateFormatKey];

export const toDate = (dateStr: string, fmt: TDateFormat = EDateFormat.Day): Date => parse(dateStr, fmt, new Date());
export const toDateStr = (date: Date, fmt: TDateFormat = EDateFormat.Day): string => format(date, fmt);
export const toDateStrFmt = (dateStr: string, fromFmt: TDateFormat, toFmt: TDateFormat): string =>
  toDateStr(toDate(dateStr, fromFmt), toFmt);

export const voidFunction = (): void => {
  Logger.log('called voidFunction');
};
