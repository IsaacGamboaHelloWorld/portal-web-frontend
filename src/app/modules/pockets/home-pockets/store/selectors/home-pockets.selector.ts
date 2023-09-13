import { createFeatureSelector, createSelector } from '@ngrx/store';

import { isNullOrUndefined } from 'util';
import { ProductsInterface } from '../../../../../core/interfaces/products.interface';
import { Product } from '../../../../../core/models/products/product';
import { IProductActive } from '../../../../../store/reducers/models/product-active/product-active.reducer';
import { IHomePockets } from '../reducers/get-pockets.reducer';
import { ILoadPrefs } from '../reducers/load-prefs.reducer';
import {
  ActivePocketState,
  ActiveProdHomeState,
  ActiveProdsFeatureName,
  HomeAccountsFeatureName,
  HomePocketsFeatureName,
  HomePocketsModuleState,
  ProductsPocketsHomeState,
  UpdatePocketState,
} from '../state/home-pockets-module.state';

function mapProducts(
  _products: ProductsInterface,
  _detail: Product[],
): ProductsInterface {
  if (isNullOrUndefined(_products)) {
    return _products;
  }

  const productsMapped = {};

  Object.keys(_products).forEach((key) => {
    productsMapped[key] = _detail.filter((_item) => _item.typeAccount === key);
  });
  return productsMapped;
}

export const HomePocketsRootSelector = createFeatureSelector<
  HomePocketsModuleState
>(HomePocketsFeatureName);

export const HomePrefsRootSelector = createFeatureSelector<
  HomePocketsModuleState
>(HomePocketsFeatureName);

export const HomeProductsRootSelector = createFeatureSelector<
  ProductsPocketsHomeState
>(HomeAccountsFeatureName);

export const MoveMoneyRootSelector = createFeatureSelector<
  ProductsPocketsHomeState
>(HomeAccountsFeatureName);

export const ActiveProdRootSelector = createFeatureSelector<
  ActiveProdHomeState
>(ActiveProdsFeatureName);

export const ActivePocketRootSelector = createFeatureSelector<
  ActivePocketState
>(HomePocketsFeatureName);

export const UpdatePocketRootSelector = createFeatureSelector<
  UpdatePocketState
>(HomePocketsFeatureName);

export const getHomePocketsState = createSelector(
  HomePocketsRootSelector,
  (state: HomePocketsModuleState) => state.homePockets,
);

export const getPrefsState = createSelector(
  HomePrefsRootSelector,
  (state: HomePocketsModuleState) => state.loadPref,
);

export const getUpdateState = createSelector(
  UpdatePocketRootSelector,
  (state: UpdatePocketState) => state.updatePocket,
);

export const selectPrefsPockets = createSelector(
  getPrefsState,
  (state: ILoadPrefs) => state,
);

export const selectHomePockets = createSelector(
  getHomePocketsState,
  (state: IHomePockets) => state,
);

export const selectUpdatePockets = createSelector(
  getHomePocketsState,
  (state: IHomePockets) => state,
);

export const getHomeProductsState = createSelector(
  HomeProductsRootSelector,
  (state: ProductsPocketsHomeState) => state.product,
);

export const selectProducts = createSelector(
  getHomeProductsState,
  (state: Product[]) => state,
);

export const getActiveProductState = createSelector(
  ActiveProdRootSelector,
  (state: ActiveProdHomeState) => state.productActive,
);

export const selectActiveProduct = createSelector(
  getActiveProductState,
  (state: IProductActive) => state,
);

export const getActivePocketState = createSelector(
  ActivePocketRootSelector,
  (state: ActivePocketState) => state.activePocket,
);

export const selectActivePocket = createSelector(
  getActivePocketState,
  (state: any) => state,
);
