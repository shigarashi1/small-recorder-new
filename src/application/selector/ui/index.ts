import { AppState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { uiReducers } from '@/store/ui';
import { omit } from '@/library/ramda';

const featureSelector = (state: AppState): ReturnType<typeof uiReducers> => state.ui;

export const loadingSelector = {
  isLoading: createSelector(featureSelector, (state) => state.loading.isLoading),
};
export const languageSelector = {
  langCode: createSelector(featureSelector, (state) => state.language.langCode),
};
export const notifierSelector = {
  notifierProps: createSelector(featureSelector, (state) => state.notifier),
};
export const errorDialogSelector = {
  hasOpened: createSelector(featureSelector, (state) => state.errorDialog.hasOpened),
  errorInfo: createSelector(featureSelector, (state) => omit(['hasOpened'], state.errorDialog)),
};
export const infoDialogSelector = {
  hasOpened: createSelector(featureSelector, (state) => state.infoDialog.hasOpened),
  infoDialog: createSelector(featureSelector, (state) => omit(['hasOpened'], state.infoDialog)),
};
export const okCancelDialogSelector = {
  hasOpened: createSelector(featureSelector, (state) => state.okCancelDialog.hasOpened),
  okCancelDialog: createSelector(featureSelector, (state) => omit(['hasOpened'], state.okCancelDialog)),
};
export const yesNoDialogSelector = {
  hasOpened: createSelector(featureSelector, (state) => state.yesNoDialog.hasOpened),
  yesNoDialog: createSelector(featureSelector, (state) => omit(['hasOpened'], state.yesNoDialog)),
};
