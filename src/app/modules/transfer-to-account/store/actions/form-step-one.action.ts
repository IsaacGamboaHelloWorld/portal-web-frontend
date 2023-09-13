import { Action } from '@ngrx/store';
import { IFormOneTransferInterface } from '../../entities/formOneTransfer.interface';

export const SET_FORM_STEP_ONE = '[Account Transfer] Form Step One';
export const RESET_FORM_STEP_ONE = '[Account Transfer] Form Reset Step One';

export class FormStepOneAction implements Action {
  readonly type: string = SET_FORM_STEP_ONE;

  constructor(public formOne: IFormOneTransferInterface) {}
}

export class FormResetStepOneAction implements Action {
  readonly type: string = RESET_FORM_STEP_ONE;
}

export type actions = FormStepOneAction | FormResetStepOneAction;
