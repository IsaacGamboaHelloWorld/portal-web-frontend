import { createReducer, on } from '@ngrx/store';
import { IGroupsTypeAlertResponse } from '../../entities/groups-type';
import * as fromGroupsType from '../actions/groups-type.action';

export const initGroupsTypeAlert: IGroupsTypeAlertResponse = {
  success: false,
  statusCode: null,
  errorMessage: '',
  specificErrorMessage: '',
  data: [],
};
export const GroupsTypeAlertReducer = createReducer(
  initGroupsTypeAlert,
  on(fromGroupsType.GroupsTypeAlertsLoadAction, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
    };
  }),
  on(fromGroupsType.GroupsTypeAlertsSuccessAction, (state, { alert }) => {
    return {
      success: alert.success,
      statusCode: alert.statusCode,
      errorMessage: alert.errorMessage,
      specificErrorMessage: alert.specificErrorMessage,
      data: alert.data,
    };
  }),
  on(fromGroupsType.GroupsTypeAlertsFailAction, (state, { data }) => {
    return {
      ...state,
      errorMessage: data,
    };
  }),
  on(fromGroupsType.GroupsTypeAlertsResetAction, (state) => {
    return initGroupsTypeAlert;
  }),
);
