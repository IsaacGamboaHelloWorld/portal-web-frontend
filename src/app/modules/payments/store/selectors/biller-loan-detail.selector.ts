import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BillerLoanDetailState } from '../reducers/biller-loan-detail.reducers';
import { NewBillerLoanDetailFeatureName } from '../state/biller-loan-detail.state';

export const NewBillerLoanDetailRootSelector = createFeatureSelector<
  BillerLoanDetailState
>(NewBillerLoanDetailFeatureName);

export const setNewBillerLoanDetailState = createSelector(
  NewBillerLoanDetailRootSelector,
  (state: BillerLoanDetailState) => state,
);

export const selectBillerPaymentDetail = createSelector(
  setNewBillerLoanDetailState,
  (state: BillerLoanDetailState) => state.data.billerPayment,
);
