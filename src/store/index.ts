import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  combineReducers,
  compose,
  applyMiddleware,
  StoreCreator,
  createStore,
  AnyAction,
  Dispatch,
  MiddlewareAPI,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSentryMiddleware from 'redux-sentry-middleware';
import * as Sentry from '@sentry/browser';
//
import history from '@/root/history';
import { Logger } from '@/library/models/logger';
//
import { rootActions } from './_root/actions';
import { config } from '@/configuration/config';

// reducers

// epics
import { sampleEpics } from '@/__sample';
import { libraryEpics } from '@/library/redux-observable';

// reducer
export const reducers = combineReducers({
  router: connectRouter(history),
});
export type AppState = ReturnType<typeof reducers>;

// MEMO: anyを許容する
/* eslint-disable @typescript-eslint/no-explicit-any */
const rootReducer = (state: any, action: any) => {
  if (action.type === rootActions.clearAllState.type) {
    state = undefined;
  }
  return reducers(state, action);
};

// epic
const rootEpic = combineEpics(
  sampleEpics, //
  libraryEpics,
);
const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>();
const crashSentryReporter = (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
  try {
    return next(action); // dispatch
  } catch (err) {
    Logger.error('Redux caught an exception!', err);
    Sentry.withScope((scope) => {
      scope.setExtra('Redux Store', { action, state: api.getState() });
      Sentry.captureException(err);
    });
    throw err; // re-throw error
  }
};

// enhance
const enhancers = compose(
  applyMiddleware(epicMiddleware, routerMiddleware(history), createSentryMiddleware(Sentry), crashSentryReporter),
  !config.isProduction && (window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    : (f: StoreCreator) => f,
);

export const configureStore = (initialState: any) => {
  const store = createStore(rootReducer, initialState, enhancers);
  epicMiddleware.run(rootEpic);
  return store;
};
