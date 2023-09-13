import { createReducer, on } from '@ngrx/store';
import { IResRedemption } from '../../entities/redemption.interface';
import {
  RedemptionActionFail,
  RedemptionActionLoad,
  RedemptionActionReset,
  RedemptionActionSuccess,
} from '../actions/redemption.actions';

export interface IRedemption {
  data: IResRedemption;
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  errorMessageCode: number;
  error: boolean;
}

export const initRedemptionReducer: IRedemption = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
  specificErrorMessage: '',
  error: false,
  errorMessageCode: null,
};

export const RedemptionReducer = createReducer(
  initRedemptionReducer,
  on(RedemptionActionLoad, (state) => {
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
  on(RedemptionActionSuccess, (state, { data }) => {
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
    RedemptionActionFail,
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
  on(RedemptionActionReset, (_state) => initRedemptionReducer),
);
