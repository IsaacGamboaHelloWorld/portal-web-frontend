import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  AdvanceFeatureName,
  AdvanceModuleState,
} from '@modules/advance/store/state/advance-module.state';
import { ApplicationState } from '@store/state/application.state';

export const AdvanceRootSelector = createFeatureSelector<AdvanceModuleState>(
  AdvanceFeatureName,
);

export const GlobalRootSelector = createFeatureSelector<ApplicationState>(
  'models',
);

export const selectProducts = createSelector(
  GlobalRootSelector,
  (state: any) => state.product,
);

export const selectFormGlobal = createSelector(
  AdvanceRootSelector,
  (state: AdvanceModuleState) => state.formGlobal,
);

export const selectTransferAdvance = createSelector(
  AdvanceRootSelector,
  (state: AdvanceModuleState) => state.transferAdvance,
);
