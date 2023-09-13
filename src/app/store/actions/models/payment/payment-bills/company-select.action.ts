import { createAction } from '@ngrx/store';
import { CompanyInterface } from '../../../../../core/interfaces/paymentBills.interface';

const enum TYPE_ACTIONS {
  LOAD = '[Company] Active Load',
  SUCCESS = '[Company] Active Success',
  FAIL = '[Company] Active Fail',
  RESET = '[Company] Active reset',
}

export const CompanyActiveSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (company: CompanyInterface) => ({ company }),
);

export const CompanyActiveResetAction = createAction(TYPE_ACTIONS.RESET);
