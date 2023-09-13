import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { ICustomerProfileCatalog } from '../../entities/load-catalog';
import { IUpdateProfileResponse } from '../../entities/update-profile-response';

export const CustomerProfileFeatureName = 'profile';

export type CustomerProfileState = Readonly<{
  catalogs: ICustomerProfileCatalog;
  updateProfile: IUpdateProfileResponse;
}>;

export const FEATURE_PROFILE_REDUCER_FEATURE = new InjectionToken<
  ActionReducerMap<CustomerProfileState>
>('Feature Customer Profile Reducer');
