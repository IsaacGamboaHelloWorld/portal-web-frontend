import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISetPayment } from '../../../entities/public-services';
import {
  IPaymentFormOne,
  IPaymentFormTwo,
  ISuccessServicePayment,
} from '../../entities/new-payment';

import {
  ActiveProductState,
  NewPaymentFeatureName,
  PaymentNewState,
  ProdsFeatureName,
  ProductsNewState,
  PublicServHomeFeatureName,
} from '../state/new-payment-module.state';

export const NewPaymentRootSelector = createFeatureSelector<PaymentNewState>(
  NewPaymentFeatureName,
);

export const ProductsRootSelector = createFeatureSelector<ProductsNewState>(
  ProdsFeatureName,
);

export const ActiveProductRootSelector = createFeatureSelector<
  ActiveProductState
>(PublicServHomeFeatureName);

export const getNewPaymentsStepOneState = createSelector(
  NewPaymentRootSelector,
  (state: PaymentNewState) => state.formOne,
);

export const setNewPaymentOne = createSelector(
  getNewPaymentsStepOneState,
  (state: IPaymentFormOne) => state,
);

export const getNewPaymentsStepTwoState = createSelector(
  NewPaymentRootSelector,
  (state: PaymentNewState) => state.formTwo,
);

export const setNewPaymentTwo = createSelector(
  getNewPaymentsStepTwoState,
  (state: IPaymentFormTwo) => state,
);

export const getPaymentState = createSelector(
  NewPaymentRootSelector,
  (state: PaymentNewState) => state.returnedInfo,
);

export const setPaymentBill = createSelector(
  getPaymentState,
  (state: ISuccessServicePayment) => state,
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
  (state: ActiveProductState) => state.setPayment,
);

export const getActiveProduct = createSelector(
  getActiveProductState,
  (state: ISetPayment) => state,
);

export const getBackHomeState = createSelector(
  NewPaymentRootSelector,
  (state: PaymentNewState) => state.backHome,
);
