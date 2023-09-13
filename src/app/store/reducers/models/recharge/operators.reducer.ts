import { createReducer, on } from '@ngrx/store';

import { IOperator } from '@modules/recharge-phone/entities/operatators';
import * as fromOperators from '@store/actions/models/recharge/operators-name-action';

export interface IOperators {
  data: IOperator[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export const initOperators: IOperators = {
  data: [],
  loading: false,
  loaded: false,
  error: false,
  errorMessage: '',
};

export const operatorsReducer = createReducer(
  initOperators,
  on(fromOperators.OperatorsLoad, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: false,
  })),
  on(fromOperators.OperatorsFail, (state, { description }) => {
    return {
      ...state,
      errorMessage: description,
      error: true,
      loading: false,
      loaded: false,
    };
  }),
  on(fromOperators.OperatorsSuccess, (state, { operators }) => {
    return {
      data: operators,
      loaded: true,
      loading: false,
      error: false,
      errorMessage: '',
    };
  }),
);
