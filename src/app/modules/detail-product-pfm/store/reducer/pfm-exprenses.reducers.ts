import { createReducer, on } from '@ngrx/store';
import { PfmExpenseData } from '../../entities/detail-expense-pfm';
import {
  expensesPfmFail,
  expensesPfmLoad,
  expensesPfmReset,
  expensesPfmSuccess,
} from '../actions/pfm-expenses.actions';

export interface IPfmExpensesState {
  data: PfmExpenseData;
  success: boolean;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
}

export const initPfmExpenses: IPfmExpensesState = {
  data: null,
  success: true,
  loading: false,
  loaded: false,
  errorMessage: null,
};

export const pfmExpensesReducer = createReducer(
  initPfmExpenses,
  on(expensesPfmLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: '',
      success: false,
    };
  }),
  on(expensesPfmSuccess, (state, { expenses }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      data: expenses,
    };
  }),
  on(expensesPfmFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage,
    };
  }),
  on(expensesPfmReset, (state) => initPfmExpenses),
);
