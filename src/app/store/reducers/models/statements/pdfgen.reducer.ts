import * as statementsActions from '@app/store/actions/models/statements/statements.action';
import { IPdfdata } from '../../../../core/interfaces/statement/pdfdata';

export interface PdfGenState {
  pdfInfo: IPdfdata;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  failedRetries: number;
}

export const initPdfGen: PdfGenState = {
  pdfInfo: null,
  loading: false,
  loaded: false,
  error: false,
  failedRetries: 0,
};

export function pdfGenReducer(
  state: PdfGenState = initPdfGen,
  action: statementsActions.actions,
): PdfGenState {
  switch (action.type) {
    case statementsActions.STATEMENTS_PDF_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case statementsActions.STATEMENTS_PDF_SUCCESS:
      return {
        pdfInfo: (action as statementsActions.StatementsGeneratePdfASuccessAction)
          .data,
        error: false,
        loading: false,
        loaded: true,
        failedRetries: 0,
      };

    case statementsActions.STATEMENTS_PDF_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
        failedRetries: state.failedRetries + 1,
      };

    case statementsActions.STATEMENTS_PDF_RESET:
      return initPdfGen;

    default:
      return state;
  }
}
