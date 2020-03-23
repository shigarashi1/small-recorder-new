import { combineReducers } from '@reduxjs/toolkit';
import { applicationListsModule } from './lists';
import { applicationEditsModule } from './edits';
import { applicationDetailsModule } from './details';

export const applicationReducers = combineReducers({
  details: applicationDetailsModule.reducer,
  edits: applicationEditsModule.reducer,
  lists: applicationListsModule.reducer,
});
