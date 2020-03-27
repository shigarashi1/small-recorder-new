import { AppState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';
import { authModule } from '@/store/entity/auth';

const featureSelector = (state: AppState): ReturnType<typeof authModule.reducer> => state.entity.auth;

export const authSelector = {
  isLoggedIn: createSelector(featureSelector, (state) => state.data.isLoggedIn),
};
