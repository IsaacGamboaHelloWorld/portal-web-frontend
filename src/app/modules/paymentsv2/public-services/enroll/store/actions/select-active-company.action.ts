import { createAction } from '@ngrx/store';
import { ICompany } from '../../entities/enroll';

const enum TYPE_ACTIONS {
  LOAD = '[Company] Active Load',
  SUCCESS = '[Company] Active Success',
  FAIL = '[Company] Active Fail',
  RESET = '[Company] Active reset',
}

export const CompanyActiveSuccessAction = createAction(
  TYPE_ACTIONS.SUCCESS,
  (company: ICompany) => ({ company }),
);

export const CompanyActiveResetAction = createAction(TYPE_ACTIONS.RESET);
