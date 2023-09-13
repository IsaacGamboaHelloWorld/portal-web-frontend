import { Action } from '@ngrx/store';
import { WithDrawalStepTwoState } from '@store/reducers/models/withdrawal/steps/withdrawal-step-two.reducer';

export const SET_WITHDRAWAL_STEP_TWO = '[Withdrawal] Step Two';
export const RESET_WITHDRAWAL_STEP_TWO = '[Withdrawal] Reset Step Two';

export class SetWithDrawalStepTwoAction implements Action {
  readonly type: string = SET_WITHDRAWAL_STEP_TWO;
  constructor(public dataForm: WithDrawalStepTwoState) {}
}

export class ResetWithDrawalStepTwoAction implements Action {
  readonly type: string = RESET_WITHDRAWAL_STEP_TWO;
}

export type actions = SetWithDrawalStepTwoAction | ResetWithDrawalStepTwoAction;
