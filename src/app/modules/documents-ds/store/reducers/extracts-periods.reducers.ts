import { createReducer, on } from '@ngrx/store';
import {
  ExtractsPeriodsFail,
  ExtractsPeriodsLoad,
  ExtractsPeriodsReset,
  ExtractsPeriodsSuccess,
} from '../actions/extracts-periods.actions';
import { IStatmentState } from '../state/documents.state';

export const initPeriods: IStatmentState = {
  account: null,
  periods: [],
  errorMessage: '',
  type: '',
  success: false,
  loading: false,
  loaded: false,
};

export const ExtractsPeriodsReducer = createReducer(
  initPeriods,
  on(ExtractsPeriodsLoad, (state) => {
    return {
      ...state,
      success: false,
      loaded: false,
      loading: true,
      account: null,
      periods: [],
      errorMessage: '',
      type: '',
    };
  }),
  on(ExtractsPeriodsSuccess, (state, { statement }) => {
    return {
      ...state,
      success: true,
      loaded: true,
      loading: false,
      account: statement.account,
      periods: statement.periods,
      type: statement.type,
    };
  }),
  on(ExtractsPeriodsFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      errorMessage,
    };
  }),
  on(ExtractsPeriodsReset, (state) => {
    return initPeriods;
  }),
);
