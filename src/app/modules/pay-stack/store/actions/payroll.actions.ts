import { createAction } from '@ngrx/store';
import { IAnswerPayRoll } from '../../entities/pay-stack';

const enum TypeActions {
  LOAD = '[CREATE PAYROLL / API] Create payroll Load payroll',
  FAIL = '[CREATE PAYROLL / API] Create payroll Fail payroll',
  SUCCESS = '[CREATE PAYROLL / API] Create payroll Success payroll',
  RESET = '[CREATE PAYROLL / API] Create payroll Reset payroll',
}

export const PayrollLoad = createAction(TypeActions.LOAD, (id: string) => ({
  id,
}));

export const PayrollFail = createAction(
  TypeActions.FAIL,
  (description: string) => ({ description }),
);
export const PayrollSuccess = createAction(
  TypeActions.SUCCESS,
  (data: IAnswerPayRoll) => ({ data }),
);
export const PayrollReset = createAction(TypeActions.RESET);
