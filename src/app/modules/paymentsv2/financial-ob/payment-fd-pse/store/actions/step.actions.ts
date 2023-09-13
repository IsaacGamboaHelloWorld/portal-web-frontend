import { createAction, props } from '@ngrx/store';
export enum TypeAction {
  SET_STEP = '[OB Free destination] - Set ',
  RESET_STEP = '[OB Free destination] - Reset ',
}

export const SetStepAction = createAction(
  TypeAction.SET_STEP,
  props<{ step: number }>(),
);

export const ResetStepAction = createAction(TypeAction.RESET_STEP);
