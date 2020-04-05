import { combineEpics } from 'redux-observable';
import { dialogsEpics } from './dialogs';

export const uiEpics = combineEpics(dialogsEpics);
