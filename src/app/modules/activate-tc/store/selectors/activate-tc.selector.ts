import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IActivateTcModuleState } from '../../entities/activate-tc';
import { NewActivateTcFeatureName } from '../state/activate-tc.state';

export const NewActivateTcRootSelector = createFeatureSelector<
  IActivateTcModuleState
>(NewActivateTcFeatureName);

export const selectActivateTc = createSelector(
  NewActivateTcRootSelector,
  (state: IActivateTcModuleState) => state.activate,
);
