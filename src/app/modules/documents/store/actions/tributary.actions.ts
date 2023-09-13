import { createAction } from '@ngrx/store';
import { IincomeTaxTC, ITributary } from '../../entities/documents';
import { IincomeRac } from '../../entities/tributary';

const enum TypeActions {
  LOAD = '[CREATE TRIBUTARY_GMF / API] Create tributary gmf Load',
  FAIL = '[CREATE TRIBUTARY_GMF / API] Create tributary gmf Fail',
  SUCCESS = '[CREATE TRIBUTARY_GMF / API] Create tributary gmf Success',
  RESET = '[CREATE TRIBUTARY_GMF / API] Create tributary gmf Reset',
}

const enum TypeActionsIncome {
  LOAD = '[CREATE TRIBUTARY_INCOME / API] Create tributary income Load',
  FAIL = '[CREATE TRIBUTARY_INCOME / API] Create tributary income Fail',
  SUCCESS = '[CREATE TRIBUTARY_INCOME / API] Create tributary income Success',
  RESET = '[CREATE TRIBUTARY_INCOME / API] Create tributary income Reset',
}

const enum TypeActionsIncomeTaxTC {
  LOAD = '[CREATE TRIBUTARY_INCOME_TC / API] Create tributary income_tc Load',
  FAIL = '[CREATE TRIBUTARY_INCOME_TC / API] Create tributary income_tc Fail',
  SUCCESS = '[CREATE TRIBUTARY_INCOME_TC / API] Create tributary income_tc Success',
  RESET = '[CREATE TRIBUTARY_INCOME_TC / API] Create tributary income_tc Reset',
}

const enum TypeActionsRac {
  LOAD = '[CREATE TRIBUTARY_RAC / API] Create tributary rac Load',
  FAIL = '[CREATE TRIBUTARY_RAC / API] Create tributary rac Fail',
  SUCCESS = '[CREATE TRIBUTARY_RAC / API] Create tributary rac Success',
  RESET = '[CREATE TRIBUTARY_RAC / API] Create tributary rac Reset',
}

export const TributaryLoad = createAction(
  TypeActions.LOAD,
  (data?: string) => ({
    data,
  }),
);

export const TributaryFail = createAction(TypeActions.FAIL, (data: string) => ({
  data,
}));
export const TributarySuccess = createAction(
  TypeActions.SUCCESS,
  (data: ITributary) => ({ data }),
);

export const TributaryReset = createAction(TypeActions.RESET);
///////// Income Tax
export const TributaryIncomeLoad = createAction(
  TypeActionsIncome.LOAD,
  (data?: string) => ({
    data,
  }),
);

export const TributaryIncomeFail = createAction(
  TypeActionsIncome.FAIL,
  (data: string) => ({
    data,
  }),
);
export const TributaryIncomeSuccess = createAction(
  TypeActionsIncome.SUCCESS,
  (data: ITributary) => ({ data }),
);

export const TributaryIncomeReset = createAction(TypeActionsIncome.RESET);
///////// Income Tax Credit Card
export const TributaryIncomeTaxTCLoad = createAction(
  TypeActionsIncomeTaxTC.LOAD,
  (data?: string) => ({
    data,
  }),
);

export const TributaryIncomeTaxTCFail = createAction(
  TypeActionsIncomeTaxTC.FAIL,
  (data: string) => ({
    data,
  }),
);
export const TributaryIncomeTaxTCSuccess = createAction(
  TypeActionsIncomeTaxTC.SUCCESS,
  (data: IincomeTaxTC) => ({ data }),
);

export const TributaryIncomeTaxTCReset = createAction(
  TypeActionsIncomeTaxTC.RESET,
);
//////// RAC
export const TributaryIncomeRacLoad = createAction(
  TypeActionsRac.LOAD,
  (data?: string) => ({
    data,
  }),
);

export const TributaryIncomeRacFail = createAction(
  TypeActionsRac.FAIL,
  (data: string) => ({
    data,
  }),
);
export const TributaryIncomeRacSuccess = createAction(
  TypeActionsRac.SUCCESS,
  (data: IincomeRac) => ({ data }),
);

export const TributaryIncomeRacReset = createAction(TypeActionsRac.RESET);
