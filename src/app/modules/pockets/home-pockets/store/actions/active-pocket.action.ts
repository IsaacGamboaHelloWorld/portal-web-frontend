import { createAction } from '@ngrx/store';
import { IPocketActive } from '../reducers/active-pocket.reducer';

const enum TYPE_ACTIONS {
  SET_POCKET = '[Detail] Set Pocket Active',
  RESET_POCKET = '[Detail] Reset Pocket Active',
}

export const SetPocketActive = createAction(
  TYPE_ACTIONS.SET_POCKET,
  (pocketDetail: IPocketActive) => ({
    pocketDetail,
  }),
);
export const ResetPocketActive = createAction(TYPE_ACTIONS.RESET_POCKET);
