import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  HomeFeatureName,
  HomeModuleState,
} from '@modules/home/store/state/home-module.state';

export const HomeRootSelector = createFeatureSelector<HomeModuleState>(
  HomeFeatureName,
);

export const getSocksState = createSelector(
  HomeRootSelector,
  (state: HomeModuleState) => state.stocks,
);
export const OrderOfPaymentSelect = createSelector(
  HomeRootSelector,
  (state: HomeModuleState) => state.order,
);

export const selectStocksAll = createSelector(
  getSocksState,
  (state) => state.all,
);
export const selectStocksPeriod = createSelector(
  getSocksState,
  (state) => state.period,
);
export const selectStocksType = createSelector(
  getSocksState,
  (state) => state.type,
);

export const nicknamesAllState = createSelector(
  HomeRootSelector,
  (state) => state.nicknamesAll,
);
