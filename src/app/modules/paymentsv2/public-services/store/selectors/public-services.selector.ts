import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../../../../core/models/products/product';
import { IPublicService } from '../../entities/public-services';
import { BillerDetailState } from '../reducers/biller-detail.reducer';
import { IDeletePublicServicePayments } from '../reducers/delete-payment.reducer';
import { INextPublicServicesPayments } from '../reducers/next-payments.reducer';
import { IRecurringPaymentState } from '../reducers/recurring-payment.reducer';
import { IAllPublicServicesPayments } from '../reducers/registered-bills.reducer';
import { IEditRecurringState } from '../reducers/selected-recurring.reducer';
import {
  ProductsFeatureName,
  ProductsModuleState,
  PublicServiceFeatureName,
  PublicServiceModuleState,
} from '../state/public-services-module.state';

export const PublicServicesRootSelector = createFeatureSelector<
  PublicServiceModuleState
>(PublicServiceFeatureName);

export const ProductsRootSelector = createFeatureSelector<ProductsModuleState>(
  ProductsFeatureName,
);

export const getAllPaymentsState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.allPayments,
);

export const selectAllPayments = createSelector(
  getAllPaymentsState,
  (state: IAllPublicServicesPayments) => state,
);

export const getActivePaymentState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.billerInfo,
);

export const getActiveNotdataPaymentState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.activePayment.activePayment,
);

export const selectActivePayment = createSelector(
  getActivePaymentState,
  (state: BillerDetailState) => state,
);

export const selectActiveNotDataPayment = createSelector(
  getActiveNotdataPaymentState,
  (state: IPublicService) => state,
);

export const getNextPaymentsState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.nextPayments,
);

export const selectNextToPayments = createSelector(
  getNextPaymentsState,
  (state: INextPublicServicesPayments) => state,
);

export const getDeletePaymentState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.deletePayment,
);

export const selectDeletePayment = createSelector(
  getDeletePaymentState,
  (state: IDeletePublicServicePayments) => state,
);

export const getAllProductsState = createSelector(
  ProductsRootSelector,
  (state: ProductsModuleState) => state.product,
);

export const selectProducts = createSelector(
  getAllProductsState,
  (state: Product[]) => state,
);

export const getRecurringPaymentState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.recurring,
);

export const selectRecurringPayment = createSelector(
  getRecurringPaymentState,
  (state: IRecurringPaymentState) => state,
);

export const getEditRecurringPaymentState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.toEditRecurring,
);

export const selectEditRecurringPayment = createSelector(
  getEditRecurringPaymentState,
  (state: IEditRecurringState) => state,
);

export const getDeleteRecurringPaymentState = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.deleteRecurring,
);

export const selectDeleteRecurringPayment = createSelector(
  getDeleteRecurringPaymentState,
  (state: IRecurringPaymentState) => state,
);

export const selectEnabledAgreementsOnPaymentSchedule = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.enabledAgreementsOnPaymentSchedule,
);

export const selectStep = createSelector(
  PublicServicesRootSelector,
  (state: PublicServiceModuleState) => state.step,
);
