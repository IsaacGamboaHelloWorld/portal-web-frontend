import { createReducer, on } from '@ngrx/store';
import { IResConfiguration } from '../../entities/configuration.interface';
import {
  ConfigurationActionFail,
  ConfigurationActionLoad,
  ConfigurationActionReset,
  ConfigurationActionSuccess,
} from '../actions/configuration.actions';

export interface IConfiguration {
  data: IResConfiguration;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  errorMessageCode: number;
  error: boolean;
}

export const initConfigurationReducer: IConfiguration = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
  specificErrorMessage: '',
  error: false,
  errorMessageCode: null,
};

export const ConfigurationReducer = createReducer(
  initConfigurationReducer,
  on(ConfigurationActionLoad, (state) => {
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
  on(ConfigurationActionSuccess, (state, { data }) => {
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
    ConfigurationActionFail,
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
  on(ConfigurationActionReset, (_state) => {
    return initConfigurationReducer;
  }),
);
