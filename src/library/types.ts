/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_MESSAGE } from '@/presentation/i18n/message';

export type NonDateObject<T> = T extends Date ? never : T;
export type IndexesObject<T = any> = { [key: string]: T };
export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>;
};
export type NestedRecord<T, V> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? Array<NestedRecord<R, V>>
    : T[K] extends object
    ? T[K] extends NonDateObject<T[K]>
      ? NestedRecord<T[K], V>
      : V
    : V;
};

// Error
export type TErrorCode = keyof typeof ERROR_MESSAGE;
export type TError = {
  errorCode: TErrorCode;
  code: string;
  message: string;
  stack: string;
  params: string[];
};
export type TErrorPartial = NestedPartial<TError>;
