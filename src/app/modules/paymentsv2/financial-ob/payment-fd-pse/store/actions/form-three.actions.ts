import { createAction, props } from '@ngrx/store';
import { ISetFormThree } from './../../entities/step-form-three.interface';

export enum TypeAction {
  SET_FORM_STEP_THREE = '[PAYMENT FD] - Set From Three',
  RESET_FORM_STEP_THREE = '[PAYMENT FD] - Reset From Three',
}

export const setFormThreeAction = createAction(
  TypeAction.SET_FORM_STEP_THREE,
  props<{ form: ISetFormThree }>(),
);

export const resetFormThreeAction = createAction(
  TypeAction.RESET_FORM_STEP_THREE,
);
