import { createReducer, on } from '@ngrx/store';
import { ITargetAlertResponse } from '../../entities/target';
import * as fromTarget from '../actions/target.action';

export const initTargerAlert: ITargetAlertResponse = {
  success: false,
  statusCode: null,
  errorMessage: '',
  specificErrorMessage: '',
  data: [],
};
export const TargetAlertReducer = createReducer(
  initTargerAlert,
  on(fromTarget.TargetAlertsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromTarget.TargetAlertsSuccessAction, (state, { alert }) => {
    return {
      success: alert.success,
      statusCode: alert.statusCode,
      errorMessage: alert.errorMessage,
      specificErrorMessage: alert.specificErrorMessage,
      data: alert.data,
    };
  }),
  on(fromTarget.TargetAlertsFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
    };
  }),
  on(fromTarget.TargetAlertsResetAction, (state) => {
    return initTargerAlert;
  }),
);
