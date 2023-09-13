import { Action } from '@ngrx/store';

export const MOVEMENT_SAVE_DATA = '[Detail Product] Save Movement data';
export const MOVEMENT_RESET_DATA = '[Detail Product] Reset Movement data';

export class MovementSaveDataAction implements Action {
  readonly type: string = MOVEMENT_SAVE_DATA;

  constructor(public typeAccount: string, public accountId: string) {}
}

export class MovementResetDataAction implements Action {
  readonly type: string = MOVEMENT_RESET_DATA;
}

export type actions = MovementSaveDataAction | MovementResetDataAction;
