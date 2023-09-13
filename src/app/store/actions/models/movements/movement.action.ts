import { Action } from '@ngrx/store';

import { Movement } from '@core/models/movement/movement';

export const MOVEMENT_LOAD = '[Detail Product] Load Movement';
export const MOVEMENT_SUCCESS = '[Detail Product] Success Movement';
export const MOVEMENT_FAIL = '[Detail Product] Fail Movement';
export const MOVEMENT_RESET = '[Detail Product] Reset Movement';

export class MovementLoadAction implements Action {
  readonly type: string = MOVEMENT_LOAD;

  constructor(
    public typeAccount: string,
    public accountId: string,
    public from: string = '',
    public to: string = '',
  ) {}
}

export class MovementSuccessAction implements Action {
  readonly type: string = MOVEMENT_SUCCESS;

  constructor(public movement: Movement) {}
}

export class MovementFailAction implements Action {
  readonly type: string = MOVEMENT_FAIL;

  constructor(public errorMessage: string) {}
}

export class MovementResetAction implements Action {
  readonly type: string = MOVEMENT_RESET;
}

export type actions =
  | MovementLoadAction
  | MovementSuccessAction
  | MovementFailAction
  | MovementResetAction;
