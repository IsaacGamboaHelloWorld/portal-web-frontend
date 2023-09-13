import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CustomerProfileFeatureName,
  CustomerProfileState,
} from '../store/state/profile.state';

export const ProfileRootSelector = createFeatureSelector<CustomerProfileState>(
  CustomerProfileFeatureName,
);

export const selectCatalogs = createSelector(
  ProfileRootSelector,
  (state: CustomerProfileState) => state.catalogs,
);

export const selectUpdateResponse = createSelector(
  ProfileRootSelector,
  (state: CustomerProfileState) => state.updateProfile,
);
