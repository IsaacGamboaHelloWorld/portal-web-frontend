import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BlockProductFeatureName,
  BlockProductModuleState,
} from '../state/block-product.state';

export const BlockProductRootSelector = createFeatureSelector<
  BlockProductModuleState
>(BlockProductFeatureName);

export const blockProductResponse = createSelector(
  BlockProductRootSelector,
  (state: BlockProductModuleState) => state.blockProductResponse,
);

export const debitCardsListResponse = createSelector(
  BlockProductRootSelector,
  (state: BlockProductModuleState) => state.debitCardListResponse,
);
