import { combineReducers } from '@ngrx/store';

import { historyTransferReducer as historicPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';

export const HomePaymentRootReducer = combineReducers({
  historicPayments,
});
