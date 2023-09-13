import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../../../../core/models/products/product';
import { IBankElement } from '../../entities/financial-op';
import { IDeleteLoanPayments } from '../reducers/delete-payment.reducer';
import { IHistoricPayments } from '../reducers/payment-history.reducer';
import { IAllFinancialOpPayments } from '../reducers/registered-bills.reducer';
import { IActiveFinancialOpPaymentPayments } from '../reducers/selected-payment.reducer';
import {
  FinancialOpFeatureName,
  FinancialOpModuleState,
  GeneralAllState,
  GeneralFeatureName,
} from '../state/financial-op-module.state';

export const FinancialOpRootSelector = createFeatureSelector<
  FinancialOpModuleState
>(FinancialOpFeatureName);

export const GeneralRootSelector = createFeatureSelector<GeneralAllState>(
  GeneralFeatureName,
);

export const getAllPaymentsState = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.allPayments,
);

export const selectAllPayments = createSelector(
  getAllPaymentsState,
  (state: IAllFinancialOpPayments) => state,
);

export const getActivePaymentState = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.activePayment,
);

export const getDeletePaymentState = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.deletePayment,
);

export const selectDeletePayment = createSelector(
  getDeletePaymentState,
  (state: IDeleteLoanPayments) => state,
);

export const selectActivePayment = createSelector(
  getActivePaymentState,
  (state: IActiveFinancialOpPaymentPayments) => state,
);

export const getNextPaymentsState = createSelector(
  GeneralRootSelector,
  (state: GeneralAllState) => state.product,
);

export const selectNextToPayments = createSelector(
  getNextPaymentsState,
  (state: Product[]) => state,
);

export const getBanksState = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.banks.data,
);

export const selectBanksPayments = createSelector(
  getBanksState,
  (state: IBankElement[]) => state,
);

export const getPaymentsState = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.historyPayment,
);

export const selectStep = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.step,
);

export const selectIsFreeDestinationFlow = createSelector(
  FinancialOpRootSelector,
  (state: FinancialOpModuleState) => state.navigation.isFreeDestination,
);

export const selectHistoricPayments = createSelector(
  getPaymentsState,
  (state: IHistoricPayments) => state,
);
