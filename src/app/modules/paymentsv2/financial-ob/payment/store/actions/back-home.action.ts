import { createAction } from '@ngrx/store';

const enum TYPE_ACTIONS {
  BACK_HOME_STEP = '[BACK_HOME_STEP] Back Home',
  RESET_BACK_HOME_STEP = '[BACK_HOME_STEP] Reset Back Home',
}

export const SetBackHome = createAction(
  TYPE_ACTIONS.BACK_HOME_STEP,
  (come_back: boolean) => ({
    come_back,
  }),
);
export const ResetBackHome = createAction(TYPE_ACTIONS.RESET_BACK_HOME_STEP);
