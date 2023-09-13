import { createReducer, on } from '@ngrx/store';
import {
  OtpAthValidateFail,
  OtpAthValidateLoad,
  OtpAthValidateReset,
  OtpAthValidateSuccess,
} from '../actions';
import { IOtpAthValidate } from '../state/otp-auth.state';

export const initOtpAthValidate: IOtpAthValidate = {
  data: null,
  loaded: false,
  loading: false,
  success: false,
  errorMessage: null,
};

export const OtpAthValidateReducer = createReducer(
  initOtpAthValidate,
  on(OtpAthValidateLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
      success: false,
    };
  }),
  on(OtpAthValidateSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      success: true,
      data,
    };
  }),
  on(OtpAthValidateFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(OtpAthValidateReset, (_state) => {
    return initOtpAthValidate;
  }),
);
