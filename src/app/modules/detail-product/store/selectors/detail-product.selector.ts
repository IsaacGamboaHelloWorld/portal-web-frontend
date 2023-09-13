import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DetailProductFeatureName,
  DetailProductModuleState,
} from '../state/detail-product.state';

export const BlockProductRootSelector = createFeatureSelector<
  DetailProductModuleState
>(DetailProductFeatureName);

export const movementsFileResponse = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.movementsFileState.data,
);

export const movementsFileState = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.movementsFileState,
);

export const nicknamesState = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.nicknames,
);
export const nicknamesAllState = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.nicknamesAll,
);
export const nicknamesCreateState = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.nicknamesCreate,
);
export const nicknamesDeleteState = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.nicknamesDelete,
);
export const nicknamesUpdateState = createSelector(
  BlockProductRootSelector,
  (state: DetailProductModuleState) => state.nicknamesUpdate,
);
