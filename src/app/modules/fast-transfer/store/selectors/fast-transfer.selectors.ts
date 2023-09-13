import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FastTransferName,
  IFastTransferState,
  ProdsFeatureName,
  ProductsFastTransfer,
} from '../state/fast-transfer.state';

export const NewStateRootSelector = createFeatureSelector<IFastTransferState>(
  FastTransferName,
);

export const stepFastTransferSelector = createSelector(
  NewStateRootSelector,
  (state: IFastTransferState) => state.step,
);
export const HomeProductsRootSelector = createFeatureSelector<
  ProductsFastTransfer
>(ProdsFeatureName);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsFastTransfer) => state.product,
);
export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);
export const fastTransferSelector = createSelector(
  NewStateRootSelector,
  (state: IFastTransferState) => state.FastTransfer,
);
