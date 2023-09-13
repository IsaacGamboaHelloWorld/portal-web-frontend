import { createAction, props } from '@ngrx/store';
import { ISetFormTwo } from '../../entities/step-form-two.interface';

export enum TypeAction {
  SET_FORM_STEP_TWO = '[PAYMENT FD] - Set From Two',
  RESET_FORM_STEP_TWO = '[PAYMENT FD] - Reset From Two',
}

export const setFormTwoAction = createAction(
  TypeAction.SET_FORM_STEP_TWO,
  props<{ form: ISetFormTwo }>(),
);

export const resetFormTwoAction = createAction(TypeAction.RESET_FORM_STEP_TWO);
