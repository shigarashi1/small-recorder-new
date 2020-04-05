/* eslint-disable complexity, @typescript-eslint/no-explicit-any  */
import { TErrorPartial, TErrorCode } from '../types';
import { ERROR_MESSAGE } from '@/presentation/i18n/message';

const isErrorCode = (v: any): v is TErrorCode =>
  typeof v === 'string' && !!Object.keys(ERROR_MESSAGE).find((code) => code === v);

class BaseError extends Error {
  protected readonly _error: TErrorPartial;

  get info() {
    return this._error;
  }

  constructor(error: TErrorCode, params?: string[]);
  constructor(error: any, params?: string[]);
  constructor(error: TErrorCode | any, params?: string[]) {
    super(error);
    if (isErrorCode(error)) {
      this._error = { errorCode: error, params };
      return;
    }
    const code = error?.code;
    const message = error?.message;
    const stack = error?.stack;
    this._error = { code, message, stack, params };
  }
}

export class ApiError extends BaseError {}
export class SystemError extends BaseError {}
export class ValidationError extends BaseError {}
