import { Action } from '@ngrx/store';
import { FormStepTwoState } from '@store/reducers/models/payment/steps/form-step-two.reducer';

export const SET_FORM_STEP_TWO = '[Account payment] Form Step Two';
export const RESET_FORM_STEP_TWO = '[Account payment] Form Reset Step Two';

export class FormStepTwoAction implements Action {
  readonly type: string = SET_FORM_STEP_TWO;

  constructor(public dataForm: FormStepTwoState) {}
}

export class FormResetStepTwoAction implements Action {
  readonly type: string = RESET_FORM_STEP_TWO;
}

export type actions = FormStepTwoAction | FormResetStepTwoAction;
