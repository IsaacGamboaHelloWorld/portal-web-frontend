import { createReducer, on } from '@ngrx/store';
import {
  OtpAthGenerateFail,
  OtpAthGenerateLoad,
  OtpAthGenerateReset,
  OtpAthGenerateSuccess,
} from '../actions';
import { IOtpAthGenerate } from '../state/otp-auth.state';

export const initOtpAthGenerate: IOtpAthGenerate = {
  data: null,
  loaded: false,
  loading: false,
  success: false,
  errorMessage: null,
};

export const OtpAthGenerateReducer = createReducer(
  initOtpAthGenerate,
  on(OtpAthGenerateLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: null,
      data: null,
      success: false,
    };
  }),
  on(OtpAthGenerateSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      success: true,
      data,
    };
  }),
  on(OtpAthGenerateFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: false,
      errorMessage,
    };
  }),
  on(OtpAthGenerateReset, (_state) => {
    return initOtpAthGenerate;
  }),
);
