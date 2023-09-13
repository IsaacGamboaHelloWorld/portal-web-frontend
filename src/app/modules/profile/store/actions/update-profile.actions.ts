import { CustomerProfile } from '@app/core/models/user/user-profile';
import { createAction } from '@ngrx/store';
import { UpdateProfileResponse } from '../../entities/update-profile-response';

const enum TypeActions {
  LOAD = '[CREATE CUSTOMER_PROFILE_UPDATE / API] Create customer_profile_update Load',
  FAIL = '[CREATE CUSTOMER_PROFILE_UPDATE / API] Create customer_profile_update Fail',
  SUCCESS = '[CREATE CUSTOMER_PROFILE_UPDATE / API] Create customer_profile_update Success',
  RESET = '[CREATE CUSTOMER_PROFILE_UPDATE / API] Create customer_profile_update Reset',
}

export const CustomerProfileUpdateLoad = createAction(
  TypeActions.LOAD,
  (data: CustomerProfile) => ({ data }),
);

export const CustomerProfileUpdateFailed = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const CustomerProfileUpdateSuccess = createAction(
  TypeActions.SUCCESS,
  (data: UpdateProfileResponse) => ({ data }),
);

export const CustomerProfileUpdateReset = createAction(TypeActions.RESET);
