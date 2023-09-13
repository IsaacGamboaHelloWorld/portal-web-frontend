import { createAction, props } from '@ngrx/store';
import { ICudChannel } from '../state/access-control.state';

enum TYPE_ACTIONS {
  CREATE = '[Access Control] CUD Create',
  UPDATE = '[Access Control] CUD Update',
  DELETE = '[Access Control] CUD Delete',
  FAIL = '[Access Control] CUD Fail',
  SUCCESS = '[Access Control] CUD Success',
  RESET = '[Access Control] CUD Reset',
}

export const CudAccessControlCreate = createAction(
  TYPE_ACTIONS.CREATE,
  props<{ PB: boolean; MB: boolean }>(),
);

export const CudAccessControlUpdate = createAction(
  TYPE_ACTIONS.UPDATE,
  props<{ PB: boolean; MB: boolean }>(),
);

export const CudAccessControlDelete = createAction(TYPE_ACTIONS.DELETE);

export const CudAccessControlSuccess = createAction(
  TYPE_ACTIONS.SUCCESS,
  props<{ data: ICudChannel }>(),
);

export const CudAccessControlFail = createAction(
  TYPE_ACTIONS.FAIL,
  props<{ errorMessage: string }>(),
);

export const CudAccessControlReset = createAction(TYPE_ACTIONS.RESET);
