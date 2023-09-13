import { combineReducers } from '@ngrx/store';
import { financialObPaymentReducer as returnedInfo } from './enroll-of.reducer';

export const EnrollFinancialOpRootReducer = combineReducers({
  returnedInfo,
});
