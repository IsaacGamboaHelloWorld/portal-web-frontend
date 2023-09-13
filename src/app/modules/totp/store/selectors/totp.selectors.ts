import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITotpModuleState, TotpFeatureName } from '../state/totp.state';

export const TotpRootSelector = createFeatureSelector<ITotpModuleState>(
  TotpFeatureName,
);

export const TotpGenerateSelector = createSelector(
  TotpRootSelector,
  (state: ITotpModuleState) => state.generate,
);

export const TotpRegisterSelector = createSelector(
  TotpRootSelector,
  (state: ITotpModuleState) => state.register,
);

export const TotpDevicesSelector = createSelector(
  TotpRootSelector,
  (state: ITotpModuleState) => state.devices,
);
export const TotpDeleteSelector = createSelector(
  TotpRootSelector,
  (state: ITotpModuleState) => state.deleteTotp,
);
