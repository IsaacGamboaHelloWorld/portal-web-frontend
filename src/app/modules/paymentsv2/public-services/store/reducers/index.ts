import { combineReducers } from '@ngrx/store';
import { billerDetailReducer as billerInfo } from './biller-detail.reducer';
import { deletePaymentReducer as deletePayment } from './delete-payment.reducer';
import { deleteRecurringPaymentReducer as deleteRecurring } from './delete-recurring-payment.reducer';
import { enabledAgreementsReducer as enabledAgreementsOnPaymentSchedule } from './enabled-agreements.reducer';
import { nextPaymentsReducer as nextPayments } from './next-payments.reducer';
import { recurringPaymentReducer as recurring } from './recurring-payment.reducer';
import { allPaymentsReducer as allPayments } from './registered-bills.reducer';
import { activePaymentReducer as activePayment } from './selected-payment.reducer';
import { activeRecurringReducer as toEditRecurring } from './selected-recurring.reducer';
import { setPaymentReducer as setPayment } from './set-to-payment.reducer';
import { stepLineTimeReducer as step } from './step.reducer';

export const PublicServicesRootReducer = combineReducers({
  nextPayments,
  allPayments,
  activePayment,
  deletePayment,
  setPayment,
  recurring,
  deleteRecurring,
  billerInfo,
  toEditRecurring,
  enabledAgreementsOnPaymentSchedule,
  step,
});
