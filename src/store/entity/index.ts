import { combineReducers } from '@reduxjs/toolkit';
import { usersModule } from './user';
import { targetsModule } from './target';
import { recordsModule } from './record';
import { categoriesModule } from './category';
import { authModule } from './auth';

export const entityReducers = combineReducers({
  auth: authModule.reducer,
  users: usersModule.reducer,
  targets: targetsModule.reducer,
  records: recordsModule.reducer,
  categories: categoriesModule.reducer,
});
