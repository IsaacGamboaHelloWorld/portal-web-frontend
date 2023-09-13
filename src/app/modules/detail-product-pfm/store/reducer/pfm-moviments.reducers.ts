import { IGenericState } from '@app/core/interfaces';
import { createReducer, on } from '@ngrx/store';
import { PfmMovementData, PfmMovimentRequest } from '../../entities';
import {
  movimentsPfmFail,
  movimentsPfmLoad,
  movimentsPfmReset,
  movimentsPfmSuccess,
} from '../actions';

export interface IPfmMovimentsState extends IGenericState {
  data: PfmMovementData;
  request: PfmMovimentRequest;
}

export const initPfmMoviments: IPfmMovimentsState = {
  loading: false,
  loaded: false,
  success: false,
  errorMessage: null,
  data: null,
  request: null,
};

export const pfmMovimentsReducer = createReducer(
  initPfmMoviments,
  on(movimentsPfmLoad, (state, { body }) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      errorMessage: '',
      success: false,
      request: body,
    };
  }),
  on(movimentsPfmSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      data,
    };
  }),
  on(movimentsPfmFail, (state, { errorMessage }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
      errorMessage,
    };
  }),
  on(movimentsPfmReset, (_state) => initPfmMoviments),
);
