import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICodeAuthModuleState } from '../../entities/code-auth';
import { NewCodeAuthFeatureName } from '../state/code-auth.state';

export const NewCodeAuthRootSelector = createFeatureSelector<
  ICodeAuthModuleState
>(NewCodeAuthFeatureName);

export const selectCodeAuthAllowed = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.allowed,
);

export const selectCodeAuthAssign = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.assignCode,
);

export const selectStep = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.step,
);

export const selectGetSecureData = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.getSecureData,
);

export const selectUpdateSecureData = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.updateSecureData,
);

export const selectGetQuestion = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.getQuestion,
);

export const selectValidQuestion = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.validQuestion,
);

export const selectExperianState = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.experian,
);

export const selectUserSecureData = createSelector(
  NewCodeAuthRootSelector,
  (state: ICodeAuthModuleState) => state.userSecureData,
);
