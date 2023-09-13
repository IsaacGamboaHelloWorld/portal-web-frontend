import { createReducer, on } from '@ngrx/store';
import { IUpdateProfileResponse } from '../../entities/update-profile-response';
import * as CustomerProfileUpdateActions from '../actions/update-profile.actions';

export const initCustomerProfileUpdate: IUpdateProfileResponse = {
  data: null,
  success: false,
  loading: false,
  loaded: false,
  error: false,
};

export const customerProfileUpdateReducer = createReducer(
  initCustomerProfileUpdate,
  on(CustomerProfileUpdateActions.CustomerProfileUpdateLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(
    CustomerProfileUpdateActions.CustomerProfileUpdateSuccess,
    (state, { data }) => {
      return {
        data,
        success: data.success,
        error: false,
        loading: false,
        loaded: true,
      };
    },
  ),
  on(
    CustomerProfileUpdateActions.CustomerProfileUpdateFailed,
    (state, { description }) => {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
        errorMessage: description,
      };
    },
  ),
);
