import { actionCreatorFactory, Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '@/store';

// actions
const ac = actionCreatorFactory('[---samples]');
const actions = {
  initialize: ac('initialize'),
  createCategory: ac<string>('createCategory'),
};
export const _sampleActions = actions;

// epics
const sampleEpic1: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(actions.initialize),
    map(({ payload }) => payload),
    mergeMap((action) => []),
  );

const sampleEpic2: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(actions.initialize),
    map(({ payload }) => payload),
    mergeMap((action) => []),
  );

export const sampleEpics = combineEpics(sampleEpic1, sampleEpic2);
