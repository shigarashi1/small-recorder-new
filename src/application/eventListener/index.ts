import { combineEpics } from 'redux-observable';
import { uiEpics } from './ui';

export const eventListenerEpics = combineEpics(uiEpics);
