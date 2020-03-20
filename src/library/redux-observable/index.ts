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
type TNext<T = any> = Action<any> | TReceivedAction<T> | Array<Action<any> | TReceivedAction<T>>;
type TActionProps<T = any> = {
  previous?: Action<any> | Action<any>[];
  asyncFunc: Promise<T> | Observable<T>;
  next?: TNext<T>;
  error?: Action<any> | Action<any>[];
  complete?: Action<any> | Action<any>[];
};

const unityAction = <T = any>(res: T, v: Action<any> | TReceivedAction<T>): Action<any> =>
  typeof v === 'function' ? v(res) : v;
const unityActions = <T = any>(res: T, next?: TNext<T>): Action<T>[] =>
  !next ? [] : Array.isArray(next) ? next.map(partial(unityAction, [res])) : [unityAction(res, next)];

// actions
const ac = actionCreatorFactory('[library/redux-observable]');
const _actions = {
  previous: ac<TActionProps>('previous'),
  execute: ac<Omit<TActionProps, 'previous'>>('execute'),
};

export const asyncFuncWithCallback = _actions.previous;

const previous: Epic<AnyAction, Action<any>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(_actions.previous),
    concatMap(({ payload }) => [...toArray(payload?.previous || []), _actions.execute(omit(['previous'], payload))]),
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
      const completeActions = toArray(payload?.complete || []);
      if (res instanceof Error) {
        return [...toArray(payload?.error || []), ...completeActions];
      }
      return [...unityActions(payload.next), ...completeActions];
    }),
  );

export const libraryEpics = combineEpics(previous, execute);
