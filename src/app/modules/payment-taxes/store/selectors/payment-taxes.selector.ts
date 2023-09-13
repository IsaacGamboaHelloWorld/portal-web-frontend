import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../../../core/models/products/product';
import { IProductActive } from '../../../../store/reducers/models/product-active/product-active.reducer';
import { INewPaymentTaxesModuleState } from '../../entities/payment-taxes';
import {
  ActiveProdHomeState,
  NewPaymentTaxesFeatureName,
  ProdsFeatureName,
  ProductsPaymentTaxesNewState,
} from '../state/payment-taxes.state';

export const HomeProductsRootSelector = createFeatureSelector<
  ProductsPaymentTaxesNewState
>(ProdsFeatureName);

export const NewPaymentTaxesRootSelector = createFeatureSelector<
  INewPaymentTaxesModuleState
>(NewPaymentTaxesFeatureName);

export const ActiveProdRootSelector = createFeatureSelector<
  ActiveProdHomeState
>(ProdsFeatureName);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsPaymentTaxesNewState) => state.product,
);

export const setNewPaymentTaxesState = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state,
);

export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);

export const selectReturnedInfo = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state.returnedInfo,
);

export const selectFirstStep = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state.formOne,
);

export const selectCities = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state.cities,
);
export const selectTaxes = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state.taxes,
);
export const selectStep = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state.step,
);
export const selectInfoPaymentTaxes = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state,
);
export const selectReference = createSelector(
  NewPaymentTaxesRootSelector,
  (state: INewPaymentTaxesModuleState) => state.reference,
);

export const selectPaymentTaxesInfo = createSelector(
  setNewPaymentTaxesState,
  (state: INewPaymentTaxesModuleState) => state,
);

export const selectStepOne = createSelector(
  setNewPaymentTaxesState,
  (state: INewPaymentTaxesModuleState) => state.formOne,
);

export const selectDate = createSelector(
  setNewPaymentTaxesState,
  (state: INewPaymentTaxesModuleState) => state.date,
);
export const selectStatePayment = createSelector(
  setNewPaymentTaxesState,
  (state: INewPaymentTaxesModuleState) => state.payment,
);

export const selectStepTwo = createSelector(
  setNewPaymentTaxesState,
  (state: INewPaymentTaxesModuleState) => state.formTwo,
);

export const getActiveProductState = createSelector(
  ActiveProdRootSelector,
  (state: ActiveProdHomeState) => state.productActive,
);

export const selectActiveProduct = createSelector(
  getActiveProductState,
  (state: IProductActive) => state,
);
