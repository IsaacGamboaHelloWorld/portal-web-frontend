import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductActive } from '../../../../../../store/reducers/models/product-active/product-active.reducer';
import { ISetPayment } from '../../../entities/financial-op';
import {
  IPaymentFormOne,
  IPaymentFormThree,
  IPaymentFormTwo,
  ISuccessFinancialOb,
} from '../../entities/new-payment';

import {
  ActiveProductState,
  FinancialObHomeFeatureName,
  NewPaymentFOFeatureName,
  ObligationNewState,
  ProdsFeatureName,
  ProductsNewState,
} from '../state/new-payment-module.state';

export const NewPaymentRootSelector = createFeatureSelector<ObligationNewState>(
  NewPaymentFOFeatureName,
);

export const ProductsRootSelector = createFeatureSelector<ProductsNewState>(
  ProdsFeatureName,
);

export const ActiveProductRootSelector = createFeatureSelector<
  ActiveProductState
>(FinancialObHomeFeatureName);

export const getNewPaymentsStepOneState = createSelector(
  NewPaymentRootSelector,
  (state: ObligationNewState) => state.formOne,
);

export const setNewPaymentOne = createSelector(
  getNewPaymentsStepOneState,
  (state: IPaymentFormOne) => state,
);

export const getNewPaymentsStepTwoState = createSelector(
  NewPaymentRootSelector,
  (state: ObligationNewState) => state.formTwo,
);

export const setNewPaymentTwo = createSelector(
  getNewPaymentsStepTwoState,
  (state: IPaymentFormTwo) => state,
);

export const getNewPaymentsStepThreeState = createSelector(
  NewPaymentRootSelector,
  (state: ObligationNewState) => state.formThree,
);

export const setNewPaymentThree = createSelector(
  getNewPaymentsStepThreeState,
  (state: IPaymentFormThree) => state,
);

export const getPaymentState = createSelector(
  NewPaymentRootSelector,
  (state: ObligationNewState) => state.returnedInfo,
);

export const setPaymentBill = createSelector(
  getPaymentState,
  (state: ISuccessFinancialOb) => state,
);

export const getProductsPaymentsState = createSelector(
  ProductsRootSelector,
  (state: ProductsNewState) => state.product,
);

export const setPaymentProducts = createSelector(
  getProductsPaymentsState,
  (state: Product[]) => state,
);

export const getActiveProductState = createSelector(
  ActiveProductRootSelector,
  (state: ActiveProductState) => state.activePayment,
);

export const getActiveProduct = createSelector(
  getActiveProductState,
  (state: ISetPayment) => state,
);

export const getProductActiveState = createSelector(
  ProductsRootSelector,
  (state: ProductsNewState) => state.productActive,
);

export const setActivePayment = createSelector(
  getProductActiveState,
  (state: IProductActive) => state,
);

export const selectStep = createSelector(
  NewPaymentRootSelector,
  (state: ObligationNewState) => state.step,
);

export const getBackHomeState = createSelector(
  NewPaymentRootSelector,
  (state: ObligationNewState) => state.backHome,
);
