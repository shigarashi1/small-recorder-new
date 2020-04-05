import { combineEpics } from 'redux-observable';
import { errorDialogEpics } from './error-dialog';

export const uiEpics = combineEpics(errorDialogEpics);
