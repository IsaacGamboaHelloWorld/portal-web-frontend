import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IHistoricPayments } from '@modules/payments/home-payments/store/reducers/historic-payments.reducer';
import {
  HomePaymentFeatureName,
  HomePaymentModuleState,
} from '@modules/payments/home-payments/store/state/home-payments-module.state';

export const HomePaymentRootSelector = createFeatureSelector<
  HomePaymentModuleState
>(HomePaymentFeatureName);

export const getHomePaymentsState = createSelector(
  HomePaymentRootSelector,
  (state: HomePaymentModuleState) => state.historicPayments,
);

export const selectHistoricPayments = createSelector(
  getHomePaymentsState,
  (state: IHistoricPayments) => state,
);
