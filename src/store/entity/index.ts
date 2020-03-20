import { combineReducers } from 'redux';
import { usersModule } from './user';
import { targetsModule } from './target';
import { recordsModule } from './record';
import { categoriesModule } from './category';

export const entityReducers = combineReducers({
  users: usersModule.reducer,
  targets: targetsModule.reducer,
  records: recordsModule.reducer,
  categories: categoriesModule.reducer,
});
