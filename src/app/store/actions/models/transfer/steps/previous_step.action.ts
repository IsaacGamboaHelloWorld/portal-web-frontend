import { Action } from '@ngrx/store';

export const SET_PREVIOUS_STEP = '[Account Transfer] Set Previous Step';
export const RESET_PREVIOUS_STEP = '[Account Transfer] Reset Previous Step';

export class SetPreviousStepAction implements Action {
  readonly type: string = SET_PREVIOUS_STEP;

  constructor(public step: number) {}
}

export class ResetPreviousStepAction implements Action {
  readonly type: string = RESET_PREVIOUS_STEP;
}

export type actions = SetPreviousStepAction | ResetPreviousStepAction;
