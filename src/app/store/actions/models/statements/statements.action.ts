import { Action } from '@ngrx/store';
import { IPdfdata } from '../../../../core/interfaces/statement/pdfdata';
import { IPeriodItem } from '../../../../core/interfaces/statement/period';
import { IStatement } from '../../../../core/interfaces/statement/statement';

export const STATEMENTS_SUCCESS = '[Statements Home] statements Success';
export const STATEMENTS_FAIL = '[Statements Home] statements Fail';
export const STATEMENTS_RESET = '[Statements Home] statements Reset ';
export const STATEMENTS_LOAD = '[Statements Home] statements Load';

export const STATEMENTS_PDF_SUCCESS = '[Statements Pdf] statements Pdf Success';
export const STATEMENTS_PDF_FAIL = '[Statements Pdf] statements Pdf Fail';
export const STATEMENTS_PDF_RESET = '[Statements Pdf] statements Pdf Reset ';
export const STATEMENTS_PDF_LOAD = '[Statements Pdf] statements Pdf Load';

export class StatementsLoadAction implements Action {
  readonly type: string = STATEMENTS_LOAD;
  constructor(public typeAccount: string, public accountId: string) {}
}

export class StatementsSuccessAction implements Action {
  readonly type: string = STATEMENTS_SUCCESS;
  constructor(public data: IStatement) {}
}

export class StatementsFailAction implements Action {
  readonly type: string = STATEMENTS_FAIL;
}

export class StatementsResetAction implements Action {
  readonly type: string = STATEMENTS_RESET;
}

export class StatementsGeneratePdfAction implements Action {
  readonly type: string = STATEMENTS_PDF_LOAD;
  constructor(
    public typeAccount: string,
    public accountId: string,
    public value: IPeriodItem,
  ) {}
}

export class StatementsGeneratePdfASuccessAction implements Action {
  readonly type: string = STATEMENTS_PDF_SUCCESS;
  constructor(public data: IPdfdata) {}
}

export class StatementsGeneratePdfAFailAction implements Action {
  readonly type: string = STATEMENTS_PDF_FAIL;
}

export class StatementsGeneratePdfAResetAction implements Action {
  readonly type: string = STATEMENTS_PDF_RESET;
}

export type actions =
  | StatementsLoadAction
  | StatementsFailAction
  | StatementsSuccessAction
  | StatementsResetAction
  | StatementsGeneratePdfAction
  | StatementsGeneratePdfASuccessAction
  | StatementsGeneratePdfAFailAction
  | StatementsGeneratePdfAResetAction;
