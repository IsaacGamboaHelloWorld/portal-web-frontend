import { createAction, props } from '@ngrx/store';
import { NavigateSecurity } from '../../constants/navigate-security';
const enum TYPE_ACTIONS {
  SET_STEP = '[ACCESS CONSTROL] Set Step',
  RESET_STEP = '[ACCESS CONTROL] Reset Step',
}

export const SetStepAccessControl = createAction(
  TYPE_ACTIONS.SET_STEP,
  props<{ navigate: NavigateSecurity }>(),
);

export const ResetStepAccessControl = createAction(TYPE_ACTIONS.RESET_STEP);
