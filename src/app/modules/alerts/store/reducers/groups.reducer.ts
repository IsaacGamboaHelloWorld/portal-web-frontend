import { createReducer, on } from '@ngrx/store';
import { IGroupsAlertResponse } from '../../entities/groups';
import * as fromGroups from '../actions/groups.action';

export const initGroupstAlert: IGroupsAlertResponse = {
  success: false,
  statusCode: null,
  errorMessage: '',
  specificErrorMessage: '',
  data: [],
};
export const GroupsAlertReducer = createReducer(
  initGroupstAlert,
  on(fromGroups.GroupsAlertsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromGroups.GroupsAlertsSuccessAction, (state, { alert }) => {
    return {
      success: alert.success,
      statusCode: alert.statusCode,
      errorMessage: alert.errorMessage,
      specificErrorMessage: alert.specificErrorMessage,
      data: alert.data,
    };
  }),
  on(fromGroups.GroupsAlertsFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
    };
  }),
  on(fromGroups.GroupsAlertsResetAction, (state) => {
    return initGroupstAlert;
  }),
);
