import { Action } from '@ngrx/store';
import { FormStepThreeState } from '../reducers/form-step-three.reducer';

export const SET_FORM_STEP_THREE = '[Account Transfer] Form Step Three';
export const RESET_FORM_STEP_THREE = '[Account Transfer] Form Reset Step Three';

export class FormStepThreeAction implements Action {
  readonly type: string = SET_FORM_STEP_THREE;

  constructor(public dataForm: FormStepThreeState) {}
}

export class FormResetStepThreeAction implements Action {
  readonly type: string = RESET_FORM_STEP_THREE;
}

export type actions = FormStepThreeAction | FormResetStepThreeAction;
