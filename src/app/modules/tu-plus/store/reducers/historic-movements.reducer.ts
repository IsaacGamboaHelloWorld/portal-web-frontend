import { createReducer, on } from '@ngrx/store';
import { ListTransaction } from '../../entities/historic-movements.interface';
import {
  HistoricMovementsActionFail,
  HistoricMovementsActionLoad,
  HistoricMovementsActionReset,
  HistoricMovementsActionSuccess,
} from '../actions/historic-movements.actions';

export interface IHistoricMovements {
  data: ListTransaction[];
  loading: boolean;
  loaded: boolean;
  success: boolean;
  errorMessage: string;
  specificErrorMessage: string;
  errorMessageCode: number;
  error: boolean;
}

export const initHistoricMovementsReducer: IHistoricMovements = {
  data: null,
  loading: false,
  loaded: false,
  success: false,
  errorMessage: '',
  specificErrorMessage: '',
  error: false,
  errorMessageCode: null,
};

export const HistoricMovementsReducer = createReducer(
  initHistoricMovementsReducer,
  on(HistoricMovementsActionLoad, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: false,
      errorMessage: '',
      specificErrorMessage: '',
      errorMessageCode: null,
    };
  }),
  on(HistoricMovementsActionSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage: null,
      specificErrorMessage: null,
      error: false,
      success: true,
      data,
    };
  }),
  on(
    HistoricMovementsActionFail,
    (state, { errorMessage, specificErrorMessage, errorMessageCode }) => {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: true,
        errorMessage,
        specificErrorMessage,
        errorMessageCode,
      };
    },
  ),
  on(HistoricMovementsActionReset, (_state) => initHistoricMovementsReducer),
);
