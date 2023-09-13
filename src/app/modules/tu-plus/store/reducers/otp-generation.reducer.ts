import { createReducer, on } from '@ngrx/store';
import { IResOTPGeneration } from '../../entities/otp-generation.interface';
import {
  OTPGenerationActionFail,
  OTPGenerationActionLoad,
  OTPGenerationActionReset,
  OTPGenerationActionSuccess,
} from '../actions/otp-generation.actions';

export interface IOTPGeneration {
  data: IResOTPGeneration;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  error: boolean;
  specificErrorMessage: string;
  errorMessageCode: number;
}

export const initOTPGenerationReducer: IOTPGeneration = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  error: false,
  errorMessage: '',
  specificErrorMessage: '',
  errorMessageCode: null,
};

export const OTPGenerationReducer = createReducer(
  initOTPGenerationReducer,
  on(OTPGenerationActionLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      specificErrorMessage: '',
      errorMessageCode: null,
    };
  }),
  on(OTPGenerationActionSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      specificErrorMessage: null,
      error: false,
      success: true,
      data,
    };
  }),
  on(
    OTPGenerationActionFail,
    (state, { errorMessage, specificErrorMessage, errorMessageCode }) => {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: true,
        errorMessage,
        specificErrorMessage,
        errorMessageCode,
      };
    },
  ),
  on(OTPGenerationActionReset, (_state) => initOTPGenerationReducer),
);
