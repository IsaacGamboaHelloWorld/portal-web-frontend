import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RegisteredPublicServiceFeatureName,
  RegisteredPublicServiceModuleState,
} from '../state/registered-sp-module.state';

export const InfoPaymentSPRootSelector = createFeatureSelector<
  RegisteredPublicServiceModuleState
>(RegisteredPublicServiceFeatureName);

export const getInfoPayments = createSelector(
  InfoPaymentSPRootSelector,
  (state: RegisteredPublicServiceModuleState) => state.infoPayments,
);
