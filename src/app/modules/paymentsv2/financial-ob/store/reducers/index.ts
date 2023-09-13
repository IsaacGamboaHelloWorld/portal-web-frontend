import { combineReducers } from '@ngrx/store';

import { loansBanksReducer as banks } from './banks.reducer';
import { deleteLoanReducer as deletePayment } from './delete-payment.reducer';
import { stepNavigationFlowReducer as navigation } from './navigate.reducer';
import { paymentHistoryReducer as historyPayment } from './payment-history.reducer';
import { allFOPaymentsReducer as allPayments } from './registered-bills.reducer';
import { activeFOPaymentReducer as activePayment } from './selected-payment.reducer';
import { stepLineTimeReducer as step } from './step.reducer';

export const FinancialOBRootReducer = combineReducers({
  allPayments,
  activePayment,
  banks,
  deletePayment,
  historyPayment,
  step,
  navigation,
});
