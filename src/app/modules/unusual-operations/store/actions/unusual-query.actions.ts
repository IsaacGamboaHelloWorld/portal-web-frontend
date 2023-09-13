import { createAction, props } from '@ngrx/store';
import { ITransactionsByCard } from '../../entities/unusual-query-response.interface';

export enum TypeUnsualQueryAction {
  LOAD = '[UNUSUAL OP QUERY] - Load',
  SUCCESS = '[UNUSUAL OP QUERY] - Success',
  FAIL = '[UNUSUAL OP QUERY] - Fail',
  RESET = '[UNUSUAL OP QUERY] - Reset',
}

export const UnusualQueryLoadAction = createAction(TypeUnsualQueryAction.LOAD);

export const UnusualQuerySuccessAction = createAction(
  TypeUnsualQueryAction.SUCCESS,
  props<{ data: ITransactionsByCard[] }>(),
);

export const UnusualQueryFailAction = createAction(
  TypeUnsualQueryAction.FAIL,
  props<{ errorMessage: string }>(),
);

export const UnusualQueryResetAction = createAction(
  TypeUnsualQueryAction.RESET,
);
