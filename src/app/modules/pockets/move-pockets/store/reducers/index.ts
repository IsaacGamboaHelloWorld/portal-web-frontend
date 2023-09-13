import { combineReducers } from '@ngrx/store';

import { moveMoneyPocketReducer as moveMoneyPocket } from './move-money.reducer';

export const MoveMoneyPocketRootReducer = combineReducers({
  moveMoneyPocket,
});
