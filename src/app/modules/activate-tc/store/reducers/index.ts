import { combineReducers } from '@ngrx/store';

import { ActivateTcReducer as activate } from './activate-ts.reducers';

export const ActivateTcRootReducer = combineReducers({
  activate,
});
