import { createReducer, on } from '@ngrx/store';
import { IAlertObj } from '../../entities/alerts';
import * as fromAlerts from '../../store/actions/get-alerts.action';

export interface IHomeAlerts {
  alerts: IAlertObj[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initHomeAlerts: IHomeAlerts = {
  alerts: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const homeAlertsReducer = createReducer(
  initHomeAlerts,
  on(fromAlerts.LoadAlertsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAlerts.LoadAlertsSuccessAction, (state, { alerts }) => {
    return {
      alerts,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromAlerts.LoadAlertsFailAction, (state, { data }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: data,
    };
  }),
  on(fromAlerts.LoadAlertsResetAction, (state) => {
    return initHomeAlerts;
  }),
);
