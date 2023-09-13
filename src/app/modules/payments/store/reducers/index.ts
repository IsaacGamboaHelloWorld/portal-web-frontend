import { combineReducers } from '@ngrx/store';

import { billerLoanDetailReducer as billerLoanDetail } from './biller-loan-detail.reducers';

export const BillerLoanDetailReducer = combineReducers({
  billerLoanDetail,
});
