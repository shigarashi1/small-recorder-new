import { actionCreatorFactory, Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, concatMap } from 'rxjs/operators';
import omit from 'ramda/es/omit';
import partial from 'ramda/es/partial';
import { AppState } from '@/store';
import { toArray } from '@/library/helpers';
import { Observable, isObservable } from 'rxjs';

// MEMO: anyを許容する
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionParameters<T extends (...args: any[]) => any> = Parameters<T>[0];
export type WrapAction<T extends (...args: any[]) => any> = Action<ActionParameters<T>>;
export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

type TReceivedAction<T = any> = (v: T) => Action<any>;
type TNextErrorType<T = any> = Action<any> | TReceivedAction<T> | Array<Action<any> | TReceivedAction<T>>;
type TActionProps<T = any> = {
  onPrevious?: Action<any> | Action<any>[];
  asyncFunc: Promise<T> | Observable<T>;
  onNext?: TNextErrorType<T>;
  onError?: TNextErrorType<T>;
  onComplete?: Action<any> | Action<any>[];
};

const unityAction = <T = any>(res: T, v: Action<any> | TReceivedAction<T>): Action<any> =>
  typeof v === 'function' ? v(res) : v;
const unityActions = <T = any>(res: T, next?: TNextErrorType<T>): Action<T>[] =>
  !next ? [] : toArray(next).map(partial(unityAction, [res]));

// actions
const ac = actionCreatorFactory('[library/redux-observable]');
const _actions = {
  previous: ac<TActionProps>('previous'),
  execute: ac<Omit<TActionProps, 'onPrevious'>>('execute'),
};
export const asyncFnWithCallback = _actions.previous;

const previous: Epic<AnyAction, Action<any>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(_actions.previous),
    concatMap(({ payload }) => [...toArray(payload?.onPrevious), _actions.execute(omit(['onPrevious'], payload))]),
  );

const execute: Epic<AnyAction, Action<any>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(_actions.execute),
    mergeMap(async ({ payload }) => {
      const { asyncFunc } = payload;
      const res = await (isObservable(asyncFunc) ? asyncFunc.toPromise() : asyncFunc).catch((err) => err);
      return { res, payload: omit(['execute'], payload) };
    }),
    concatMap(({ res, payload }) => {
      const completeActions = toArray(payload?.onComplete);
      if (res instanceof Error) {
        return [...unityActions(payload.onError), ...completeActions];
      }
      return [...unityActions(payload.onNext), ...completeActions];
    }),
  );

export const libraryEpics = combineEpics(previous, execute);
