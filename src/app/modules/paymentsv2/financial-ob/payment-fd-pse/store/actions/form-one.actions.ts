import { createAction, props } from '@ngrx/store';
import { ISetFormOne } from '../../entities/step-form-one.interface';

export enum TypeAction {
  SET_FORM_STEP_ONE = '[PAYMENT FD] - Set From One',
  RESET_FORM_STEP_ONE = '[PAYMENT FD] - Reset From One',
}

export const setFormOneAction = createAction(
  TypeAction.SET_FORM_STEP_ONE,
  props<{ form: ISetFormOne }>(),
);

export const resetFormOneAction = createAction(TypeAction.RESET_FORM_STEP_ONE);
