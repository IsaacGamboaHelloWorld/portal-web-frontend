import * as statementsActions from '@app/store/actions/models/statements/statements.action';
import { IStatement } from '../../../../core/interfaces/statement/statement';

export interface StatementsState {
  statementsInfo: IStatement;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const initStatements: StatementsState = {
  statementsInfo: null,
  loading: false,
  loaded: false,
  error: false,
};

export function statementReducer(
  state: StatementsState = initStatements,
  action: statementsActions.actions,
): StatementsState {
  switch (action.type) {
    case statementsActions.STATEMENTS_LOAD:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };

    case statementsActions.STATEMENTS_SUCCESS:
      return {
        statementsInfo: (action as statementsActions.StatementsSuccessAction)
          .data,
        error: false,
        loading: false,
        loaded: true,
      };

    case statementsActions.STATEMENTS_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: true,
      };

    case statementsActions.STATEMENTS_RESET:
      return initStatements;

    default:
      return state;
  }
}
