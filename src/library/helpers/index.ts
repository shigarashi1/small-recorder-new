import { equals, uniqBy, not } from '@/library/ramda';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { Logger } from '../models/logger';

export const toArray = <T>(v?: T | T[]): T[] => (typeof v === 'undefined' ? [] : Array.isArray(v) ? v : [v]);
export const mergeAndUniqArray = <T>(condition: (v: T) => string, prevData: T[], addData: T[]): T[] =>
  uniqBy(condition, [...addData, ...prevData]);
export const notEquals = <T>(v1: T, v2: T): boolean => not(equals(v1, v2));

export const EDateFormat = {
  Day: 'yyyy-MM-dd',
  DayJp: 'yyyy年MM月dd日',
  DateTime: 'yyyy-MM-dd HH:mm:ss',
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
