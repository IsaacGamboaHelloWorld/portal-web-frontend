import { Action } from '@ngrx/store';

export const MOVEMENT_SAVE_FILTER = '[Detail Product] Save Movement filter';
export const MOVEMENT_RESET_FILTER = '[Detail Product] Reset Movement filter';

export class MovementSaveFilterAction implements Action {
  readonly type: string = MOVEMENT_SAVE_FILTER;

  constructor(
    public typeFilter: string,
    public from: string,
    public to: string,
  ) {}
}

export class MovementResetFilterAction implements Action {
  readonly type: string = MOVEMENT_RESET_FILTER;
}

export type actions = MovementSaveFilterAction | MovementResetFilterAction;
