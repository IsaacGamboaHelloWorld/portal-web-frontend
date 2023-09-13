import { createReducer, on } from '@ngrx/store';
import { IPublicServiceAlerts } from '../../entities/alerts';
import * as fromAll from '../actions/registered-services.action';

export interface IAllPublicServicesAlerts {
  bills: IPublicServiceAlerts[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initAllPublicServicesAlerts: IAllPublicServicesAlerts = {
  bills: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const allServicesAlertsReducer = createReducer(
  initAllPublicServicesAlerts,
  on(fromAll.AllPublicServicesAlertsReset, (state) => {
    return initAllPublicServicesAlerts;
  }),
  on(fromAll.AllPublicServicesAlertsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAll.AllPublicServicesAlertsSuccess, (state, { billers }) => {
    return {
      bills: billers,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromAll.AllPublicServicesAlertsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
