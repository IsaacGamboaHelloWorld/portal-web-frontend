import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPocketActive } from '../../../home-pockets/store/reducers/active-pocket.reducer';
import {
  HomePocketsFeatureName,
  HomePocketsModuleState,
} from '../../../home-pockets/store/state/home-pockets-module.state';
import { IMoveMoney } from '../reducers/move-money.reducer';

import {
  ActivePocketHomeState,
  MoveMoneyPocketFeatureName,
  MoveMoneyPocketModuleState,
} from '../state/move-money-module.state';

export const HomePocketsRootSelector = createFeatureSelector<
  HomePocketsModuleState
>(HomePocketsFeatureName);

export const MoveMoneyPocketsRootSelector = createFeatureSelector<
  MoveMoneyPocketModuleState
>(MoveMoneyPocketFeatureName);

export const getHomePocketsState = createSelector(
  HomePocketsRootSelector,
  (state: HomePocketsModuleState) => state.homePockets,
);

export const ActivePocketRootSelector = createFeatureSelector<
  ActivePocketHomeState
>(HomePocketsFeatureName);

export const getActivePocketState = createSelector(
  ActivePocketRootSelector,
  (state: ActivePocketHomeState) => state.pocketActive,
);

export const getMovedMoneyState = createSelector(
  MoveMoneyPocketsRootSelector,
  (state: MoveMoneyPocketModuleState) => state.moveMoneyPocket,
);

export const selectActivePocket = createSelector(
  getActivePocketState,
  (state: IPocketActive) => state,
);

export const selectMovedMoney = createSelector(
  getMovedMoneyState,
  (state: IMoveMoney) => state,
);
