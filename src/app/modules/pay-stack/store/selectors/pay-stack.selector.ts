import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPayStackModuleState } from '../../entities/pay-stack';
import {
  ActiveProdHomeState,
  NewPayStackFeatureName,
  ProdsFeatureName,
  ProductsPayStakNewState,
} from '../state/pay-stack.state';

export const HomeProductsRootSelector = createFeatureSelector<
  ProductsPayStakNewState
>(ProdsFeatureName);

export const NewPaystackRootSelector = createFeatureSelector<
  IPayStackModuleState
>(NewPayStackFeatureName);

export const ActiveProdRootSelector = createFeatureSelector<
  ActiveProdHomeState
>(ProdsFeatureName);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsPayStakNewState) => state.product,
);

export const setNewPaymentTaxesState = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state,
);

export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);

export const selectInfoPayStack = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state,
);

export const selectFormStepOne = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.formOne,
);

export const selectDate = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.date,
);

export const selectInformation = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.information,
);

export const selectPayment = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.payment,
);

export const selectPayroll = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.payroll,
);

export const selectStep = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.step,
);
export const selectInfoBiller = createSelector(
  NewPaystackRootSelector,
  (state: IPayStackModuleState) => state.billerInfo,
);
