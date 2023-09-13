import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/experian.actions';

export const initExperianFlowReducer: object = {
  success: false,
  loading: false,
  error: false,
};

export const ExperianFlowReducer = createReducer(
  initExperianFlowReducer,
  on(actions.ExperianFlowLoad, (state) => {
    return {
      ...state,
      success: false,
      loading: true,
      error: false,
    };
  }),
  on(actions.ExperianFlowSuccess, (state, { data }) => {
    return {
      success: data.success,
      data,
      loading: false,
      error: false,
    };
  }),
  on(actions.ExperianFlowFail, (state, { data }) => {
    return {
      success: data.success,
      data,
      loading: false,
      error: true,
    };
  }),
  on(actions.ExperianFlowReset, (state) => {
    return initExperianFlowReducer;
  }),
);
