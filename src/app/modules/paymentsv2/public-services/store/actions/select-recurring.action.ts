import { createAction } from '@ngrx/store';

import { IEditRecurring } from '../../entities/public-services';

const enum TypeActions {
  LOAD = '[SELECT RECURRING / API] Select recurring Load',
  FAIL = '[SELECT RECURRING / API] Select recurring Fail',
  SUCCESS = '[SELECT RECURRING / API] Select recurring Success',
  RESET = '[SELECT RECURRING / API] Select recurring Reset',
}

export const SelectRecurringLoad = createAction(
  TypeActions.LOAD,
  (recurring: IEditRecurring) => ({ recurring }),
);
export const SelectRecurringSuccess = createAction(TypeActions.SUCCESS);

export const SelectRecurringReset = createAction(TypeActions.RESET);
