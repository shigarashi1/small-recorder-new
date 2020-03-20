import { combineReducers } from 'redux';
import { loadingModule } from './loading';
import { languageModule } from './language';

export const uiReducers = combineReducers({
  loading: loadingModule.reducer,
  languageModule: languageModule.reducer,
});
