import { createReducer, on } from '@ngrx/store';
import { IFinancialOpAlerts } from '../../entities/alerts';
import * as fromAll from '../actions/registered-bills.action';

export interface IAllFinancialOpAlerts {
  registeredLoans: IFinancialOpAlerts[];
  errorMessage: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initAllFinancialOpAlerts: IAllFinancialOpAlerts = {
  registeredLoans: null,
  errorMessage: '',
  loading: false,
  loaded: false,
  error: false,
};
export const allFOAlertsReducer = createReducer(
  initAllFinancialOpAlerts,
  on(fromAll.AllFinancialOpAlertsReset, (state) => {
    return initAllFinancialOpAlerts;
  }),
  on(fromAll.AllFinancialOpAlertsLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromAll.AllFinancialOpAlertsSuccess, (state, { registeredLoans }) => {
    return {
      registeredLoans,
      error: false,
      loading: false,
      loaded: true,
      errorMessage: '',
    };
  }),
  on(fromAll.AllFinancialOpAlertsFail, (state, { description }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error: true,
      errorMessage: description,
    };
  }),
);
