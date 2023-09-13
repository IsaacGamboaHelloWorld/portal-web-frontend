import { createReducer, on } from '@ngrx/store';
import { IPaymentPseStatusResponse } from '../../entities/status-pse.interface';
import {
  failStatusPseAction,
  loadStatusPseAction,
  resetStatusPseAction,
  successStatusPseAction,
} from '../actions/status-pse.action';

export interface IStatusPse {
  data: IPaymentPseStatusResponse;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  success: boolean;
}

export const initStatusPse: IStatusPse = {
  data: null,
  success: true,
  loaded: true,
  loading: false,
  errorMessage: null,
};

export const statusPaymentPseReducer = createReducer(
  initStatusPse,
  on(loadStatusPseAction, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(successStatusPseAction, (state, { data }) => ({
    ...state,
    data,
    loaded: true,
    loading: false,
    success: true,
  })),
  on(failStatusPseAction, (state, { errorMessage }) => ({
    ...state,
    loaded: true,
    loading: false,
    data: null,
    success: false,
    errorMessage,
  })),
  on(resetStatusPseAction, (state) => initStatusPse),
);
