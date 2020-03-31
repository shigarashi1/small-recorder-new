import { AppState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { authModule } from '@/store/auth';

const featureSelector = (state: AppState): ReturnType<typeof authModule.reducer> => state.auth;

export const authSelector = {
  isLoggedIn: createSelector(featureSelector, (state) => state.data.isLoggedIn),
  username: createSelector(featureSelector, (state) => state.data.username),
};
