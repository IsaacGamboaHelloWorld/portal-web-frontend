import { Product } from '@app/core/models/products/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  INewTransferState,
  NewTransferName,
  ProdsFeatureName,
  ProductsTransfer,
} from '../state/new-transfer.state';

export const NewStateRootSelector = createFeatureSelector<INewTransferState>(
  NewTransferName,
);

export const stepNewTransferSelector = createSelector(
  NewStateRootSelector,
  (state: INewTransferState) => state.step,
);

export const HomeProductsRootSelector = createFeatureSelector<ProductsTransfer>(
  ProdsFeatureName,
);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsTransfer) => state.product,
);
export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);
export const newTransferSelector = createSelector(
  NewStateRootSelector,
  (state: INewTransferState) => state.NewTransfer,
);
export const FormNewTransferSelector = createSelector(
  NewStateRootSelector,
  (state: INewTransferState) => state.FormNewTransfer,
);
