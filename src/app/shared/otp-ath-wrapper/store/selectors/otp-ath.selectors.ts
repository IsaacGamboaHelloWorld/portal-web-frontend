import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IOtpAthModuleState, otpAthFeatureName } from '../state/otp-auth.state';

export const OtpAthRootSelector = createFeatureSelector<IOtpAthModuleState>(
  otpAthFeatureName,
);

export const OtpAthGenerateSelector = createSelector(
  OtpAthRootSelector,
  (state: IOtpAthModuleState) => state.generate,
);

export const OtpAthValidateSelector = createSelector(
  OtpAthRootSelector,
  (state: IOtpAthModuleState) => state.validate,
);

export const OtpAthModalSelector = createSelector(
  OtpAthRootSelector,
  (state: IOtpAthModuleState) => state.modal,
);

export const OtpAthModalFlowSelector = createSelector(
  OtpAthRootSelector,
  (state: IOtpAthModuleState) => state.flow,
);
