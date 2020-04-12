import { combineReducers } from '@reduxjs/toolkit';
import { loadingModule } from './loading';
import { languageModule } from './language';
import { notifierModule } from './notifier';
import { errorDialogModule } from './error-dialog';
import { infoDialogModule } from './info-dialog';
import { okCancelDialogModule } from './ok-cancel-dialog';
import { yesNoDialogModule } from './yes-no-dialog';

export const uiReducers = combineReducers({
  loading: loadingModule.reducer,
  language: languageModule.reducer,
  notifier: notifierModule.reducer,
  infoDialog: infoDialogModule.reducer,
  okCancelDialog: okCancelDialogModule.reducer,
  yesNoDialog: yesNoDialogModule.reducer,
  errorDialog: errorDialogModule.reducer,
});
