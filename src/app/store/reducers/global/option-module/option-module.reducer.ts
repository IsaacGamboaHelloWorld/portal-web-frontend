import { DataOption } from '@app/core/interfaces/option-module.interface';
import {
  OptionModuleFailAction,
  OptionModuleLoadAction,
  OptionModuleResetAction,
  OptionModuleSuccessAction,
} from '@app/store/actions/global/option-module/option-module.action';
import { createReducer, on } from '@ngrx/store';

export interface OptionModuleState {
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  data: DataOption;
}

export const initOptionModuleState: OptionModuleState = {
  data: null,
  loading: false,
  loaded: false,
  success: true,
  errorMessage: '',
  specificErrorMessage: '',
};

export const optionModuleLoadReducer = createReducer(
  initOptionModuleState,
  on(OptionModuleLoadAction, (state) => {
    return {
      ...state,
      loading: true,
      errorMessage: '',
      specificErrorMessage: '',
    };
  }),
  on(OptionModuleSuccessAction, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      success: true,
      data,
    };
  }),
  on(
    OptionModuleFailAction,
    (state, { errorMessage, specificErrorMessage }) => {
      return {
        ...state,
        loaded: true,
        loading: false,
        success: false,
        errorMessage,
        specificErrorMessage,
      };
    },
  ),
  on(OptionModuleResetAction, (state) => {
    return {
      ...state,
      loaded: true,
      loading: false,
    };
  }),
);
