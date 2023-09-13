import { combineReducers } from '@ngrx/store';

import { chooseHistoryReducer as historicPayments } from './choose-history.reducer';

export const ChooseHistoryRootReducer = combineReducers({
  historicPayments,
});
