import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../../../../core/models/products/product';
import { IProductActive } from '../../../../../store/reducers/models/product-active/product-active.reducer';
import { INewPocketModuleState } from '../../entities/new-pockets';
import {
  ActiveProdHomeState,
  NewPocketFeatureName,
  ProdsFeatureName,
  ProductsPocketsNewState,
} from '../state/new-pocket-module.state';

export const HomeProductsRootSelector = createFeatureSelector<
  ProductsPocketsNewState
>(ProdsFeatureName);

export const NewPocketRootSelector = createFeatureSelector<
  INewPocketModuleState
>(NewPocketFeatureName);

export const ActiveProdRootSelector = createFeatureSelector<
  ActiveProdHomeState
>(ProdsFeatureName);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsPocketsNewState) => state.product,
);

export const setNewPocketState = createSelector(
  NewPocketRootSelector,
  (state: INewPocketModuleState) => state,
);

export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);

export const selectReturnedInfo = createSelector(
  NewPocketRootSelector,
  (state: INewPocketModuleState) => state.returnedInfo,
);

export const selectFirstStep = createSelector(
  NewPocketRootSelector,
  (state: INewPocketModuleState) => state.formOne,
);

export const selectCategories = createSelector(
  NewPocketRootSelector,
  (state: INewPocketModuleState) => state.categories,
);

export const selectPocketInfo = createSelector(
  setNewPocketState,
  (state: INewPocketModuleState) => state,
);

export const selectStepOne = createSelector(
  setNewPocketState,
  (state: INewPocketModuleState) => state.formOne,
);

export const selectStepTwo = createSelector(
  setNewPocketState,
  (state: INewPocketModuleState) => state.formTwo,
);

export const selectStepThree = createSelector(
  setNewPocketState,
  (state: INewPocketModuleState) => state.formThree,
);

export const getActiveProductState = createSelector(
  ActiveProdRootSelector,
  (state: ActiveProdHomeState) => state.productActive,
);

export const selectActiveProduct = createSelector(
  getActiveProductState,
  (state: IProductActive) => state,
);
