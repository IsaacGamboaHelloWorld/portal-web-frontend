import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IHistoricPayments } from '../reducers/choose-history.reducer';
import {
  ChooseHistoryFeatureName,
  ChooseHistoryModuleState,
} from '../state/choose-history-module.state';

export const ChooseHistoryRootSelector = createFeatureSelector<
  ChooseHistoryModuleState
>(ChooseHistoryFeatureName);

export const getHomePaymentsState = createSelector(
  ChooseHistoryRootSelector,
  (state: ChooseHistoryModuleState) => state.historicPayments,
);

export const selectHistoricPayments = createSelector(
  getHomePaymentsState,
  (state: IHistoricPayments) => state,
);
