import { combineReducers } from '@ngrx/store';

import {
  loadPrefReducer as loadPref,
  savePrefReducer as savePref,
} from './news.reducers';

export const NewsRootReducer = combineReducers({
  savePref,
  loadPref,
});
