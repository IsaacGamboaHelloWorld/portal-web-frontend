import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IYourPlusState,
  ProdsFeatureName,
  ProductsRedemption,
  YourPlusName,
} from '../state/your-plus.state';

export const YourPlusRootSelector = createFeatureSelector<IYourPlusState>(
  YourPlusName,
);

export const selectStepSelector = createSelector(
  YourPlusRootSelector,
  (state: IYourPlusState) => state.step,
);
export const historicMovementsSelector = createSelector(
  YourPlusRootSelector,
  (state: IYourPlusState) => state.historicMovements,
);
export const configurationSelector = createSelector(
  YourPlusRootSelector,
  (state: IYourPlusState) => state.configuration,
);
export const redemptionSelector = createSelector(
  YourPlusRootSelector,
  (state: IYourPlusState) => state.redemption,
);
export const otpGenerationSelector = createSelector(
  YourPlusRootSelector,
  (state: IYourPlusState) => state.otpGeneration,
);
export const HomeProductsRootSelector = createFeatureSelector<
  ProductsRedemption
>(ProdsFeatureName);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsRedemption) => state.product,
);
export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);
