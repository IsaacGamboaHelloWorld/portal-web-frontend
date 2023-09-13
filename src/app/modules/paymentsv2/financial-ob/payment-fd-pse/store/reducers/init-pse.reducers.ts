import { createReducer, on } from '@ngrx/store';
import { IPaymentPseResponse } from '../../entities/payment-transaction-pse.interface';
import {
  failInitPseAction,
  loadInitPseAction,
  resetInitPseAction,
  successInitPseAction,
} from '../actions/init-pse.actions';

export interface IInitPaymentPse {
  data: IPaymentPseResponse;
  success: boolean;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
}

export const initPaymentPse: IInitPaymentPse = {
  data: null,
  success: true,
  errorMessage: null,
  loaded: true,
  loading: false,
};

export const initPaymentPseReducer = createReducer(
  initPaymentPse,
  on(loadInitPseAction, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(successInitPseAction, (state, { data }) => ({
    ...state,
    data,
    loaded: true,
    loading: false,
    success: true,
  })),
  on(failInitPseAction, (state, { errorMessage }) => ({
    ...state,
    data: null,
    loaded: true,
    loading: false,
    success: false,
    errorMessage,
  })),
  on(resetInitPseAction, (state) => initPaymentPse),
);
