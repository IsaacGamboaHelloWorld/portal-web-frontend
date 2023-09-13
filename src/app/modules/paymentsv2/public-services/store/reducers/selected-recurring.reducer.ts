import { createReducer, on } from '@ngrx/store';
import { IEditRecurring } from '../../entities/public-services';
import * as fromRecurring from '../actions/select-recurring.action';

export interface IEditRecurringState {
  recurring: IEditRecurring;
}

export const initEditRecurring: IEditRecurringState = {
  recurring: null,
};
export const activeRecurringReducer = createReducer(
  initEditRecurring,
  on(fromRecurring.SelectRecurringLoad, (state, { recurring }) => {
    return {
      recurring,
    };
  }),
  on(fromRecurring.SelectRecurringReset, (state) => {
    return initEditRecurring;
  }),
);
