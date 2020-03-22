import { ERROR_MESSAGE } from '@/presentation/i18n/message';

export type IndexesObject<T = any> = { [key: string]: T };
export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>;
};

// Error
export type TErrorCode = keyof typeof ERROR_MESSAGE;
export type TError = {
  errorCode?: TErrorCode;
  code?: string;
  message?: string;
  stack?: string;
  params?: string[];
};
