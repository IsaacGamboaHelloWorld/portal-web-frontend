import { Action } from '@ngrx/store';

export const SET_STEP_W = '[Withdrawal] Set Step';
export const RESET_STEP_W = '[Withdrawal] Reset Step';

export class SetStepWAction implements Action {
  readonly type: string = SET_STEP_W;

  constructor(public step: number) {}
}

export class ResetStepWAction implements Action {
  readonly type: string = RESET_STEP_W;
}

export type actions = SetStepWAction | ResetStepWAction;
