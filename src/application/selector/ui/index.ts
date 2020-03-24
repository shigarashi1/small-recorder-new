import { AppState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { uiReducers } from '@/store/ui';

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
