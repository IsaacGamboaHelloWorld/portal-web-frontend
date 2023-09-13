import { createAction } from '@ngrx/store';
import { IinfoUser } from '../../entities/alerts';

const enum TYPE_ACTIONS {
  LOAD = '[ALERTS] Load Info User Alerts Loans',
  SUCCESS = '[ALERTS] Success Info User Alerts Loans',
  FAIL = '[ALERTS] Error Info User Alerts Loans',
  RESET = '[ALERTS] Reset Info User Alerts Loans',
}

export const InfoUserLoadAction = createAction(TYPE_ACTIONS.LOAD);

export const InfoUserSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (info: IinfoUser) => ({ info }),
);

export const InfoUserFailAction = createAction(
  TYPE_ACTIONS.FAIL,
  (data: string) => ({
    data,
  }),
);

export const InfoUserResetAction = createAction(TYPE_ACTIONS.RESET);
