import { createReducer, on } from '@ngrx/store';
import { IAlertObj } from '../../entities/alerts';
import * as fromCreate from '../actions/create-alert.action';

export interface ICreateAlert {
  alert: IAlertObj;
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initCreateAlert: ICreateAlert = {
  alert: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const createAlertReducer = createReducer(
  initCreateAlert,
  on(fromCreate.CreateAlertsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromCreate.CreateAlertsSuccessAction, (state, { alert }) => {
    return {
      alert,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromCreate.CreateAlertsFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromCreate.CreateAlertsResetAction, (state) => {
    return initCreateAlert;
  }),
);
