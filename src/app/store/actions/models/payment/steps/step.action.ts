import { Action } from '@ngrx/store';

export const SET_STEP = '[Account Payment] Set Step';
export const RESET_STEP = '[Account Payment] Reset Step';

export class SetStepAction implements Action {
  readonly type: string = SET_STEP;

  constructor(public step: number) {}
}

export class ResetStepAction implements Action {
  readonly type: string = RESET_STEP;
}

export type actions = SetStepAction | ResetStepAction;
