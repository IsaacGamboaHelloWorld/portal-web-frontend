import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ISecurityModuleState,
  SecurityFeatureName,
} from '../state/security-state';

export const SecurityRootSelector = createFeatureSelector<ISecurityModuleState>(
  SecurityFeatureName,
);

export const StepSelector = createSelector(
  SecurityRootSelector,
  (state: ISecurityModuleState) => state.navigate,
);
