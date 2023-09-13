import { createAction } from '@ngrx/store';
import { IAnswerActivateTc, ISendActivateTc } from '../../entities/activate-tc';

const enum TypeActions {
  LOAD = '[CREATE ACTIVATE_TC / API] Create activate_tc Load',
  FAIL = '[CREATE ACTIVATE_TC / API] Create activate_tc Fail',
  SUCCESS = '[CREATE ACTIVATE_TC / API] Create activate_tc Success',
  RESET = '[CREATE ACTIVATE_TC / API] Create activate_tc Reset',
}

export const ActivateTcLoad = createAction(
  TypeActions.LOAD,
  (data?: ISendActivateTc) => ({
    data,
  }),
);

export const ActivateTcFail = createAction(
  TypeActions.FAIL,
  (data: IAnswerActivateTc) => ({ data }),
);
export const ActivateTcSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IAnswerActivateTc) => ({ data }),
);

export const ActivateTcReset = createAction(TypeActions.RESET);
