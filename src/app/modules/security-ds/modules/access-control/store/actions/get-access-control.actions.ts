import { createAction, props } from '@ngrx/store';
import { IDataChannel } from '../state/access-control.state';

export enum TYPE_ACTIONS {
  LOAD = '[Access Control] Get Load',
  FAIL = '[Access Control] Get Fail',
  SUCCESS = '[Access Control] Get Success',
  RESET = '[Access Control] Get Reset',
}

export const GetAccessControlLoad = createAction(TYPE_ACTIONS.LOAD);

export const GetAccessControlFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const GetAccessControlSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ data: IDataChannel }>(),
);

export const GetAccessControlReset = createAction(TYPE_ACTIONS.RESET);
