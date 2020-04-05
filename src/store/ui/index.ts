import { combineReducers } from '@reduxjs/toolkit';
import { loadingModule } from './loading';
import { languageModule } from './language';
import { notifierModule } from './notifier';
import { errorDialogModule } from './error-dialog';

export const uiReducers = combineReducers({
  loading: loadingModule.reducer,
  language: languageModule.reducer,
  notifier: notifierModule.reducer,
  errorDialog: errorDialogModule.reducer,
});
